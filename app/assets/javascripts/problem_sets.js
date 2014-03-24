// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// Vertically centers any mathjax output
function verticallyCenterMathJax() {
	$(".mathjax").each(function(el) {
		var $el       = $(this),
			$textarea = $el.parents(".row").find("textarea"),
			desired   = $textarea.outerHeight(),
		    height    = $el.height();
		if(height >= desired) {
			$el.css('padding-top', "0px");
		} else {
			$el.css('padding-top', (desired - height) / 2.0 + "px");
		}
	});
}

$(document).ready(function() {
	// If we find #problemCreate, we initialize the problem creation system
	$problemCreate = $("#problemCreate");
	$problems = $problemCreate.find("#problems");

	if($problemCreate.length > 0) {
		console.log("Initializing problem create");

		// Once rerender is complete, vertically center the mathjax output
		MathJax.Hub.signal.Interest(
			function (message) {
				if(message[0] == "End Process") {
					verticallyCenterMathJax();
				}
			}
		);

		// Get a copy of a blank problem, used to create new problems
		blankProblem = $(".problem.new").outerHTML();
		// We don't need to display a blank problem
		if($(".problem").length > 1) {
			$(".problem.new").remove();
		}

		// Use numberManager to show "Problem #" titles (see number_manager.js, it's dead simple)
		nm = numberManager(".problemNumber");
		nm.ping();

		function updateProblem(e) {
			// Figure out the problem that needs to be updated
			var $input   = $(e.currentTarget),
			    $parent  = $input.parents(".problem"),
			    $mathjax = $input.parents(".row").find(".mathjax"),
			    $save    = $parent.find(".save");

			// Put new input into mathjax box
			$mathjax.html($input.val());

			// Reset save button
			$save.html("Save");

			// Force mathjax rerender
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		}
		// Bind update event to any existing problems
		$(".mathjax-input").keyup(function(e) { updateProblem(e); });

		function removeProblem(e) {
			// Make sure nothing is submitted
			e.preventDefault();

			// Confirm deletion
			if(confirm("Are you sure that you want to delete this problem?\n\nOnce deleted, it CANNOT be recovered!")) {
				// Figure out what problem needs to be updated
				var $target  = $(e.currentTarget),
				    $problem = $target.parents(".problem");

				if(!$problem.hasClass("new")) {
					// Problem exists in database, we have to remove it there
					$target.html('Removing...').attr("disabled", "disabled");
					id = $problem.attr('id').replace('problem-', '');

					// TODO: Get the path in a better way
					base_path = document.URL.replace("/edit", "");
					path = base_path + "/problems/" + id;

					// Send DELETE request to endpoint
					$.post(path,
						{
							"_method": "DELETE"
						},
						function(data) {
							$problem.remove();
							nm.ping();
						}, "json");
				} else {
					// Unsaved problem, just delete the element
					$problem.remove();
					nm.ping();
				}
			}
		}
		// Bind remove event to any existing problems
		$(".problem .remove").click(function(e) { removeProblem(e); });

		function saveProblem(e) {
			// Make sure nothing is submitted
			e.preventDefault();

			// Figure out what problem should be saved
			var $target  = $(e.currentTarget),
			    $problem = $target.parents(".problem");

			// Notify user that saving is happening
			$target.html("Saving...").attr("disabled", "disabled");

			// TODO: Make these classes
			$question = $problem.find("#problem_question");
			$solution = $problem.find("#problem_solution");

			// TODO: Get the path in a better way
			base_path = document.URL.replace("/edit", "");

			if($problem.hasClass("new")) {
				// Problem is unsaved, use POST (create)
				path = base_path + "/problems";
				method = "POST";
			} else {
				// Problem is saved, use PUT (update)
				id = $problem.attr('id').replace('problem-', '');
				path = base_path + "/problems/" + id;
				method = "PUT";
			}

			// Send request
			$.post(path,
				{
					"_method": method,
					"problem[question]": $question.val(),
					"problem[solution]": $solution.val()
				},
				function(data) {
					if(data.status == "success") {
						// Problem saved!
						$target.html("Saved!").removeAttr("disabled");
						$problem.removeClass("new");
					} else {
						// Problem failed to save
						// TODO: Show error message
						$target.html("Oops!").addClass("alert");
					}
				}, "json");
		}
		// Bind save event to any existing problems
		$(".problem .save").click(function(e) { saveProblem(e); });

		$("#addProblem").click(function() {
			// Create problem element
			$problems.append(blankProblem);

			// Bind events
			$problem = $problems.find(".problem").last();
			$problem.find(".remove").click(function(e) { removeProblem(e); });
			$problem.find(".save").click(function(e) { saveProblem(e); });
			$problem.find(".mathjax-input").keyup(function(e) { updateProblem(e); });

			// Update numbers
			nm.ping();
		});

	}
});