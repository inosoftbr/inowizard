/* Inosoft inowizard - an wizard component for jQuery and Twitter Bootstrap
 * https://githhub.com/inosoftbr/inowizard
 * Copyright (C) 2014 Inosoft Tecnologia Ltda. All Rights Reserved.
 * Licensed under XXXXX license. (http:// url.com) */
if (jQuery) {
    jQuery.fn.extend({
        inowiz: function () {
            var $obj = this;
            var $domObj = this[0].inowiz;
            var $btnPrev = $obj.find(".inowiz-actions button:first-child");
            var $btnNext = $(".inowiz-actions button:last-child");
            var $ul = $obj.find("ul > li");
            var $content = $obj.find(".inowiz-content");
            var $panels = $content.find("> div");
            if ($domObj === null || typeof $domObj == "undefined") {
                function getActiveLi() {
                    return $obj.find("ul > li.active");
                }
                this[0].inowiz = {
                    length: $panels.length,
                    index: $ul.index($panels.find(".active")),
                    next: function () {
                        $btnPrev.show();
                        var $active = getActiveLi();
                        $active.addClass("complete").removeClass("active");
                        $active.next().addClass("active");
                        var $actualIndex = $ul.index($active.next());
                        $panels.hide();
                        $($panels[$actualIndex]).show();
                        if ($actualIndex == $panels.length - 1) {
                            $btnNext.text($btnNext[0].textLast);
                        } else if ($actualIndex === 0) {
                            $btnNext.text($btnNext[0].textFirst);
                        } else {
                            $btnNext.text($btnNext[0].textOriginal);
                        }
                    },
                    prev: function () {
                        var $active = getActiveLi();
                        $active.removeClass("active");
                        $active.prev().removeClass("complete").addClass("active");
                        var $actualIndex = $ul.index($active.prev());
                        $panels.hide();
                        $($panels[$actualIndex]).show();
                        if ($actualIndex === 0) {
                            $btnPrev.hide();
                            $btnNext.text($btnNext[0].textFirst);
                        } else if ($actualIndex == $panels.length - 1) {
                            $btnNext.text($btnNext[0].textLast);
                        } else {
                            $btnNext.text($btnNext[0].textOriginal);
                        }
                    }
                };
                $domObj = this[0].inowiz;
                $btnNext.on("click", function () {
                    $domObj.next();
                });
                $btnPrev.on("click", function () {
                    $domObj.prev();
                });
                $btnPrev.hide();
                $obj.find("ul > li:first-child").addClass("active");
                $btnNext[0].textOriginal = $btnNext.text();
                if ($btnNext.data("text-last")) {
                    $btnNext[0].textLast = $btnNext.data("text-last");
                } else {
                    $btnNext[0].textLast = $btnNext[0].textOriginal;
                }
                if ($btnNext.data("text-first")) {
                    $btnNext[0].textFirst = $btnNext.data("text-first");
                } else {
                    $btnNext[0].textFirst = $btnNext[0].textOriginal;
                }
            } else {
                return $domObj;
            }
        }
    });
}