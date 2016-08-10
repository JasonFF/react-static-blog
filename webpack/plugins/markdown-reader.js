var fs = require('fs');
var path = require('path');
var markdown = require('markdown').markdown;

function MarkdownReader(options) {
  this.from = options.from;
  this.context = options.context;
  this.rule  = /\.md$/;
  this.times = 0
}

MarkdownReader.prototype.apply = function(compiler) {
  var that = this;
  compiler.plugin('compile', function(compilation, callback) {
    if (that.times < 1) {
      that.times = 1;
      fs.readdir(that.from,function(error,files){
        var mddata = new Array();
        var notebook = new Array();
        for (var i = 0; i < files.length; i++) {
          if (that.rule.test(files[i])) {
            if (!that.getData(files[i])) {
              return false
            }
            mddata.push(that.getData(files[i],i))
          }
        }
        global.MDDATA = mddata;
        global.NOTEBOOK = that.getNotebook(mddata);
      })
    }
  });
  compiler.plugin('done', function(compilation, callback) {
    var mddata = '<script type="text/javascript" charset="utf-8">window.MDDATA = '+ JSON.stringify(MDDATA)+';window.NOTEBOOK='+JSON.stringify(NOTEBOOK) + ';var scripts=document.getElementsByTagName("script");for (var i=0; i<scripts.length; i++) {if (/MDDATA/.test(scripts[i].text)) {scripts[i].parentNode.removeChild(scripts[i])}}</script>';
    var html = fs.readFileSync(path.join(that.context,'index.html')).toString();
    var _html = html.replace('</head>',mddata+'</head>');
    fs.writeFileSync(path.join(that.context, 'index.html'),_html);
  })
}

MarkdownReader.prototype.getData = function(files,index) {
  var that = this;
  var fileText = fs.readFileSync(path.join(that.from,files)).toString()
  var configText = fileText.substring(0, fileText.indexOf('}')+1)
  var markdownText = fileText.substring(fileText.indexOf('}')+1)

  try {
    var config = JSON.parse(configText)
  } catch (e) {
    console.error(e);
  }

  if (!config) {
    console.error(files+" 编译失败了！！"+files+" 编译失败了！！"+files+" 编译失败了！！"+files+" 编译失败了！！"+files+" 编译失败了！！")
    console.log("请在 "+files+" 开头添加JSON格式的信息！参照栗子！请注意JSON的语法！请不要在JSON中写对象！！")
    console.log("你看看你写的什么 " + configText)
    return false
  }

  var markdownHTML = markdown.toHTML(markdownText);
  config.html = markdownHTML;
  config.aid = index;
  return config
}

MarkdownReader.prototype.getNotebook = function(config) {
  var result = new Array();
  var nid = 0;
  for (var i = 0; i < config.length; i++) {
    for (var m = 0; m < result.length; m++) {
      var ifMatch = false;
      if (result[m].notebook==config[i].notebook) {
        result[m].data.push(config[i]);
        ifMatch = true;
        break
      }
    }
    if (!ifMatch) {
      result.push({
        nid: nid,
        notebook: config[i].notebook,
        data: [config[i]]
      })
      nid++
    }
  }
  return result;
}

module.exports = MarkdownReader;
