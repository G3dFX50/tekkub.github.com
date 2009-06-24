$(function() {
  $("#addon_list").each(function() {
    $("#addon_list").empty()
    $("#addon_list").append(
      $("<tr>").append(
        $("<td>").text("Loading...")
      )
    )

    $.getJSON("http://github.com/api/v2/json/repos/show/tekkub?callback=?", function(data) {
      $("#addon_list").empty()

      data.repositories.sort(function(a,b) {
        var keya = a.name.toLowerCase()
        var keyb = b.name.toLowerCase()
        if (keya < keyb) return -1
        if (keya > keyb) return 1
        return 0
      })

      $.each(data.repositories, function(i,item) {
        if (item.description.substring(0,12).toLowerCase() == "wow addon - " && !item.description.match("fork")) {
          var row = $("<tr>").attr("id", "addon-"+item.name)
          $("<td>").addClass("addon_name").addClass("no_wrap").text(item.name).appendTo(row)
          $("<td>").addClass("addon_desc").text(item.description.substring(12)).appendTo(row)
          var last_cell = $("<td>").addClass("addon_links").addClass("no_wrap").addClass("right-text").addClass("padded_links").appendTo(row)
          if (item.pledgie) {last_cell.append($("<a>").text("Donate").attr("href", "http://pledgie.org/campaigns/" + item.pledgie))}

          var buglink = $("<a>").attr("id", "bugs").text("Bugs (0)").attr("href", item.url + "/issues")
          if (item.open_issues > 0) {
            buglink.addClass("has_issues").text("Bugs (" + item.open_issues + ")")
          }
          last_cell.append(buglink)

          last_cell.append($("<a>").text("Repo").attr("href", item.url))
          $("#addon_list").append(row)

        }
      })

      $.each(wowi_links, function(i,v) {
        $("tr#addon-" + i + " td.addon_name").html(
          $("<a>").attr("href", v).text(wowi_names[i] || i)
        )
      })
    })
  })

  $(".showmorelink").remove()
  $(".top_post .showmore").before(
    $("<span>").addClass("showmorelink").text("more >>").click(function() {
      $(".top_post .thumb").remove()
      $(".showmorelink").remove()
      $(".top_post .showmore").show()
    })
  )
})
