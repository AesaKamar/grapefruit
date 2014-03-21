// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

numberManager = function(_selector) {
    return {
        ping: function() {
            $(_selector).each(function(index) {
                $(this).html(index+1);
            });
        }
    };
}

$(document).ready(function() {
    // If we find #problemCreation, we initialize the problem creation system
    $problemCreate = $("#problemCreate");
    $problems = $problemCreate.find("#problems");
    if($problemCreate.length > 0) {
        console.log("Initializing problem create");
        blankProblem = $(".problem.new").outerHTML();

        $(".mathjax-input").keyup(function() {
            var $input = $(this);
            var $mathjax = $input.parent().parent().find(".mathjax")
            $mathjax.html($input.val());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        });

        nm = numberManager(".problemNumber");
        nm.ping();

        function removeProblem(e) {
            e.preventDefault();
            if(confirm("Are you sure that you want to delete this problem?\n\nOnce deleted, it CANNOT be recovered!")) {
                $target = $(e.currentTarget);
                $problem = $target.parent().parent().parent().parent();
                if(!$problem.hasClass("new")) {
                    id = $problem.attr('id').replace('problem-', '');
                    console.log('id');
                }
                $problem.remove();
                nm.ping();
            }
        }
        $(".problem .remove").click(function(e) { removeProblem(e); });

        function saveProblem(e) {
            e.preventDefault();
            $target = $(e.currentTarget);
            $problem = $target.parent().parent().parent().parent();
            $target.html("Saving...");

            $question = $problem.find("#problem_question");
            $solution = $problem.find("#problem_solution");

            base_path = document.URL.replace("/edit", "");

            if($problem.hasClass("new")) {
                path = base_path + "/problems";
            } else {
                id = $problem.attr('id').replace('problem-', '');
                path = base_path + "/problems/" + id;
            }
            console.log(path);
            $.post(path,
                {
                    "_method": "PUT",
                    "problem[question]": $question.val(),
                    "problem[solution]": $solution.val()
                },
                function(data) {
                    if(data.status == "success") {
                        $target.html("Saved!");
                    } else {
                        $target.html("Oops!").addClass("alert");
                    }
                }, "json");
        }
        $(".problem .save").click(function(e) { saveProblem(e); });

        $("#addProblem").click(function() {
            $problems.append(blankProblem);
            $problems.find(".problem").last().find(".remove").click(function(e) { removeProblem(e); });
            $problems.find(".problem").last().find(".save").click(function(e) { saveProblem(e); });
            nm.ping();
        });

    }
});