package templates

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/microcosm-cc/bluemonday"
	"github.com/russross/blackfriday"
	"golang.org/x/net/context"
)

var staticPath string

func StaticPath() string {
	return staticPath
}

func init() {
	staticPath = os.Getenv("STATIC_URL")

	// set "/" as default
	if staticPath == "" {
		staticPath = "/"
	}
}

type Config struct {
	StaticPath string `json:"static_path"`
	//	User         models.User             `json:"user"`
	//	Notification models.UserNotification `json:"notification"`
}

type TemplateHeader struct {
	Title       string
	Description string
	SubTitle    string
	ShowBanner  bool
	OgURL       string
	OgImageURL  string
	Config      Config `json:"config"`
	//	Constants   models.Constants `json:"constants"`
}

func (t TemplateHeader) EscapeNewline(text string) template.HTML {
	safe := template.HTMLEscapeString(text)
	safe = strings.Replace(safe, "\n", "<br />", -1)
	return template.HTML(safe)
}

// TODO: render時じゃなくて、登録/更新時にMongoDBにつっこんでおくべきだと思うけど一旦これで
func (t TemplateHeader) Markdown(text string) template.HTML {
	safe := template.HTMLEscapeString(text)
	unsafe := blackfriday.MarkdownCommon([]byte(safe))
	return template.HTML(string(bluemonday.UGCPolicy().SanitizeBytes(unsafe)))
}

func (t TemplateHeader) OriginalImage(url string) string {
	// remove resize params to show original size image
	return strings.Replace(url, "/w_160", "", 1)
}

func (t TemplateHeader) FormatTimeToDate(time time.Time) string {
	return time.Format("2006-01-02")
}

func NewHeader(ctx context.Context, title, description, subTitle string, showBanner bool, ogURL string, ogImageURL string) TemplateHeader {

	h := TemplateHeader{}
	h.Config = Config{}
	h.Config.StaticPath = StaticPath()

	h.Title = title
	h.SubTitle = subTitle
	h.Description = description
	h.ShowBanner = showBanner
	h.OgURL = ogURL
	h.OgImageURL = ogImageURL

	return h
}

type templateKey string

func InitTemplates(ctx context.Context, appRoot string) context.Context {
	path := filepath.FromSlash("views") // TODO: まだ無い

	// TODO: あとでディレクトリ指定でいけるようにする
	pageNames := []string{
		"index",
		"error",
	}
	tmplMap := make(map[string]*template.Template, 0)
	for _, name := range pageNames {
		tmplMap[name] = template.Must(template.ParseFiles(filepath.Join(appRoot, path, name+".html")))
	}

	subNames := []string{
		"partials/footer",
		"partials/header",
		"partials/nav",
		"partials/scripts",
	}
	for _, name := range subNames {
		subTemplate := template.Must(template.ParseFiles(filepath.Join(appRoot, path, name+".html")))
		fmt.Printf("Template: %+v\n", subTemplate.Name())
		for _, tmpl := range tmplMap {
			tmpl.AddParseTree(name, subTemplate.Tree)
		}
	}

	return context.WithValue(ctx, templateKey("default"), tmplMap)
}

func FromContextTemplate(ctx context.Context, name string) *template.Template {
	tmpls, ok := ctx.Value(templateKey("default")).(map[string]*template.Template)
	if !ok {
		panic("not template")
	}
	return tmpls[name]
}

func ExecuteTemplate(ctx context.Context, w http.ResponseWriter, r *http.Request, name string, data interface{}) error {
	return FromContextTemplate(ctx, name).Execute(w, data)
}
