// header move in animation
if ($("input#hideBox").prop("checked")) {
    $("header h1").animate({fontSize: "3em"}, function(){
        $("header h1").css("transform","translateY(50%)")
    })
} else {
    $("header h1").css({
        "transition":"none",
        "font-size":"3em",
        "transform":"translateY(50%)"
    })
};

// mouseEffect
$(window).mousemove(function(e){
    $("#mouseBox line").attr({
        x2: e.pageX,
        y2: e.pageY
    })
});

// mouseBoxEffect
function boxEffect(){
    if ($("#boxEffect").prop("checked")) {
        $(document).mousedown(function(f){
            $("#mouseBox rect").attr({
                x: f.pageX,
                y: f.pageY,
                width: 0,
                height: 0
            });
            $(document).mousemove(function(g){
                if (g.pageX < f.pageX) {
                    $("#mouseBox rect").attr({
                        x: g.pageX,
                        width: f.pageX - g.pageX
                    })
                } else {
                    $("#mouseBox rect").attr({
                        x: f.pageX,
                        width: g.pageX - f.pageX
                    })
                };
                if (g.pageY < f.pageY) {
                    $("#mouseBox rect").attr({
                        y: g.pageY,
                        height: f.pageY - g.pageY
                    })
                } else {
                    $("#mouseBox rect").attr({
                        y: f.pageY,
                        height: g.pageY - f.pageY
                    })
                }
            })
        });
        $(document).mouseup(function(){
            // hide box on mouseup
            if ($("input#hideBox").prop("checked")) {
                $("#mouseBox rect").attr({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                })
            };
            $(document).off('mousemove')
        })
    } else {
        $(document).off("mousedown mouseup")
    }
};
$(document).ready(boxEffect());

// change line color
// ...after time period
setInterval(function(){
    var r = Math.floor(Math.random()*256),
        g = Math.floor(Math.random()*256),
        b = Math.floor(Math.random()*256);
    $("#mouseBox line").css("stroke","rgb("+r+", "+g+","+b+")");
    $("#mouseBox rect").css({
        "fill":"rgba("+r+", "+g+","+b+", 0.133)",
        "stroke":"rgb("+r+", "+g+","+b+")"
    })
}, 10000);
// ...with manual click
$(document).click(function(){
    var r = Math.floor(Math.random()*256),
        g = Math.floor(Math.random()*256),
        b = Math.floor(Math.random()*256);
    $("#mouseBox line").css("stroke","rgb("+r+", "+g+","+b+")");
    $("#mouseBox rect").css({
        "fill":"rgba("+r+", "+g+","+b+", 0.133)",
        "stroke":"rgb("+r+", "+g+","+b+")"
    })
});

// settings: # or esc
$("#settings-wrapper").css("display","flex").hide();
$(window).keyup(function(e){
    if (e.keyCode === 191 || e.keyCode === 27) {
        $("#settings-wrapper").fadeToggle()
    }
});/*
$("#cfg-btn").click(function(){
    $("#settings-wrapper").fadeToggle()
});*/

// Education - how much percent have I progressed through the 3 years of learning
function progress(percentage) {
    var startDate = new Date("2020-08-17T07:15:00").getTime(),
        endDate = new Date("2023-08-15T12:30:00").getTime(),
        now = new Date().getTime(),
        progressTotal = endDate - startDate,
        progressMS = now - startDate,
        percentage = Math.floor(progressMS / progressTotal * 10000) / 100;
    return percentage
};

// Education - show progress bar
var barState = false;
function openProgBar() {
    if (barState) {
        $("#progressBar").stop(true).fadeOut(function(){
            $("#progressBar,#myProgress").removeAttr("style");
            $("#progressBar").hide();
            $("#myProgress").text("");
        });
        $("#progressBar").fadeIn();
        barState = false;
        return
    };
    $("#progressBar")
    .stop(true)
    .removeAttr("style")
    .animate({
        width: "90vw",
        height: "20px"
    }, function(){
        $("#myProgress").text(progress()+"%")
    });
    $("#myProgress")
    .animate({
        width: progress()+"%"
    });
    barState = true
};

// show ".here" text by clicking a ".border" element
$(".border").click(function(){
    $(".here#"+this.id).stop(true).fadeToggle()
});

// show hobbies
function hobby() {
    $(".basic").stop(true).fadeOut(function(){
        $("#hobby-wrapper").stop(true).fadeIn()
    });
    // ...and hide them again (esc)
    $(window).keyup(function(e){
        if (e.keyCode === 27) {
            $("#hobby-wrapper").stop(true).fadeOut(function(){
                $(".basic").stop(true).fadeIn()
            })
        }
    })
};

// highlight what I do at home/ in my dorm
var highlight = "off";
$(".place").click(function(){
    $("#hobby-wrapper *").removeAttr("style");
    if (this.id === highlight) {
        highlight = "off";
        return
    };
    $(".place#"+this.id).css("background-color","#333c");
    $(".hobby."+this.id).css("opacity",".9");
    $(".hobby ."+this.id).show();
    highlight = this.id
});

// show more info by clicking an element that has some
$(".hasinfo").click(function() {
    $(".info#"+this.id).slideToggle()
});

$(".ka").click(function(){
    $(this).fadeTo("slow",1)
});

$("#home").click(function(){ // cryptic...
    $(window).keyup(function(e){
        if (highlight === "home" && e.keyCode === 192) {
            $(".test").show();
            $(".test").click(function(){
                $(this).text("UCyCdpKr1q2AcLRcCa_5dk8A")
            })
        };
        if (highlight === "home" && e.keyCode === 84) {
            $("p:contains(Streams)").click(function(){
                $(this).text("hmmm...")
            })
        }
    })
});

// timeline slider
$("#timepassed").width(progress()/4 + "%");
$("#timeleft").width(100 - progress()/4 + "%");
$("#diff").css("transform","translate(" + progress()/4 + "vw, -50%)");
$("#tl-slider").val(progress()*25);
function slide() {
    $("#diff").width($("#tl-slider").val()/100 - progress()/4 + "%");
    if ($("#tl-slider").val() >= 2500) {
        $(".goal#abschluss").show()
    };
    if ($("#tl-slider").val() < 2500) {
        $(".goal#abschluss").hide()
    }
}