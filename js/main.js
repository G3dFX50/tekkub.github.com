$(function() {
  $.getJSON("http://github.com/api/v2/json/repos/show/tekkub?callback=?", function(data) {
    $("#addon_list").empty();
    data.repositories.sort(function(a,b) {
      var keya = a.name
      var keyb = b.name
      if (keya < keyb) return -1
      if (keya > keyb) return 1
      return 0
    })
    $.each(data.repositories, function(i,item) {
      if (item.description.substring(0,12).toLowerCase() == "wow addon - " && !item.description.match("fork")) {
        var row = $("<tr>").attr("id", "addon-"+item.name)
        $("<td>").addClass("addon_name").text(item.name).appendTo(row)
        $("<td>").addClass("addon_desc").text(item.description.substring(12)).appendTo(row)
        var last_cell = $("<td>").addClass("addon_links").addClass("right-text").addClass("padded_links").appendTo(row)
        if (item.pledgie) {last_cell.append($("<a>").text("Donate").attr("href", "http://pledgie.org/campaigns/"+item.pledgie))}
        last_cell.append($("<a>").text("Bugs").attr("href", item.url+"/issues"))
        last_cell.append($("<a>").text("Repo").attr("href", item.url))
        $("#addon_list").append(row)
      }
    })
    $.each(data.repositories, function(i,item) {
      if (item.description.substring(0,12).toLowerCase() == "wow addon - " && !item.description.match("fork")) {
        $.get("http://github.com/tekkub/"+item.name+".git/", function(data) {
          var regexp = new RegExp("href=\"(.+?).toc")
          var matches = regexp.exec(data)
          var fullname = matches[1]
          $("#addon-"+item.name+" .addon_name").text(fullname.replace("_", " "))
          // $("tr#"+item.name+" td#addon_name").text("HAI!")
        }, "html")
      }
    })
  })
})
