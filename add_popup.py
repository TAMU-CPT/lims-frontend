REQUIRED = """								<div ng-message="required">This is required.</div>"""
MAXLENGTH = """								<div ng-message="md-maxlength">The description must be less than {length} characters long.</div>"""
INPUT_MAXLEN = 'md-maxlength="{length}"'
INPUT_REQUIRED = 'required '

INPUT = """
						<md-input-container class="md-block">
							<label>{label}</label>
							<input {options} name="{input_name}" ng-model="popup_{id}.data.{input_name}" type="{input_type}"></input>
							<div ng-messages="create{id}Form.{input_name}.$error">{requirements}
							</div>
						</md-input-container>
"""


POPUP_TEMPLATE = """
<div style="visibility: hidden">
	<div class="md-dialog-container" id="popup_{id}">
		<md-dialog>
			<md-toolbar>
				<div class="md-toolbar-tools">
					<span class="md-headline">{title}</span>
					<span flex></span>
					<md-button ng-click="{cancel}()" aria-label="close" class="md-icon-button">
						<ng-md-icon icon="close"></ng-md-icon>
					</md-button>
				</div>
			</md-toolbar>
			<md-card style="margin:0">
				<md-card-content layout="column">
					<form name="create{id}Form">
						{inputs}
						<div>
							<md-button class="md-primary"           ng-click="{cancel}()">Cancel</md-button>
							<md-button class="md-primary md-raised" ng-click="{create}()">Create</md-button>
						</div>
					</form>
				</md-card-content>
			</md-card>
		</md-dialog>
	</div>
</div>
"""


JS_TEMPLATE = """
			$scope.popup_{id} = {{
				data: {{
				}},

				show: function(ev) {{
					$mdDialog.show({{
						contentElement: "#popup_{id}",
						parent: angular.element(document.body),
						clickOutsideToClose: true,
					}});
				}},

				create: function() {{
					$scope.promise = Restangular.all("{ajax_route}").post($scope.popup_{id}.data).then(function(data) {{
						$scope.popup_{id}.data = {{}};
						// Maybe do a redirect to your new model
						// $location.path("/{url_route}/" + data.id);
					}});
					$mdDialog.cancel();
				}},

				cancel: function() {{
					$mdDialog.cancel();
				}}
			}};
"""

DONE = """This form is complete, please add

<md-button class="md-icon-button" aria-label="{title}" ng-click="popup_{id}.show()">
	<ng-md-icon icon="add"></ng-md-icon>
</md-button>

In an appropriate place in your partial
"""

import re
import os
import glob
from cmd import Cmd
from termcolor import colored
# py2/3 raw_input
try:
	input = raw_input
except NameError:
	pass

def _append_slash_if_dir(p):
	if p and os.path.isdir(p) and p[-1] != os.sep:
		return p + os.sep
	else:
		return p


class HelloWorld(Cmd):
	Cmd.intro = colored("Welcome to CICADA CLI","yellow")
	Cmd.prompt = colored(">> ","cyan")
	id = None
	inputs = []

	def do_init(self, line):
		"""Initialize the form"""
		self.id = input("Form id: ")
		self.title = input("Form title: ")

		self.ajax_route = input("AJAX Route Component [app/model]: ")
		self.url_route = input("User Route [usually 'models']: ")
		print("Form configured, run 'add_input' to add inputs and then 'write' to save the form to files.")

	def safe_name(self, data):
		return re.sub('[^a-z0-9_]', '', data.lower())

	def do_add_input(self, line):
		"""Add an input to a form."""
		name = input("Field name: ")
		required = input("Required? [Y/n]: ") in ('y', 'Y', 'T', 'J')
		max_length = input("Max Length [0]: ") or 0
		input_type = input("Input type [text, number, date, email, file]: ")

		input_options = []
		input_children = []

		if required:
			input_options.append(INPUT_REQUIRED)
			input_children.append(REQUIRED)

		if max_length > 0:
			input_options.append(INPUT_MAXLEN.format(length=max_length))
			input_children.append(MAXLENGTH.format(length=max_length))

		self.inputs.append(
			INPUT.format(
				label=name,
				options=' '.join(input_options),
				input_name=self.safe_name(name),
				id=self.id,
				requirements='\n' + '\n'.join(input_children),
				input_type=input_type,
			)
		)

	def do_write_html(self, fn):
		"""Write out HTML component. This supports tab-completion"""
		# Want to append here
		with open(fn, 'a') as handle:
			handle.write(POPUP_TEMPLATE.format(
				id=self.id,
				title=self.title,
				cancel='popup_%s.cancel' % self.id,
				create='popup_%s.create' % self.id,
				inputs='\n'.join(self.inputs),
			))

	def do_write_js(self, fn):
		"""Write out HTML component. This supports tab-completion"""
		new_text = JS_TEMPLATE.format(
			id=self.id,
			ajax_route=self.ajax_route,
			url_route=self.url_route,
		)

		MATCH = '// CICADA: NEW_INPUTS_HERE_DO_NOT_REMOVE'
		with open(fn, 'r+') as handle:
			data = handle.read()
			data = data.replace(MATCH, MATCH + '\n' + new_text)
			handle.seek(0)
			handle.write(data)
			handle.truncate()

		print(DONE.format(title=self.title, id=self.id))

	def complete_write_js(self, text, line, begidx, endidx):
		return self.autocomplete(text, line, begidx, endidx)

	def complete_write_html(self, text, line, begidx, endidx):
		return self.autocomplete(text, line, begidx, endidx)

	def autocomplete(self, text, line, begidx, endidx):
		before_arg = line.rfind(" ", 0, begidx)
		if before_arg == -1:
			return # arg not found

		fixed = line[before_arg+1:begidx]  # fixed portion of the arg
		arg = line[before_arg+1:endidx]
		pattern = arg + '*'

		completions = []
		for path in glob.glob(pattern):
			path = _append_slash_if_dir(path)
			completions.append(path.replace(fixed, "", 1))
		return completions



	def do_EOF(self, line):
		return True

	# Hide do_EOF
	def get_names(self):
		__hiden_methods = ['do_EOF']
		# If ID isn't defined, they haven't run init yet, so hide
		# dependent actions
		if not self.id:
			__hiden_methods += ['do_add_input', 'do_write', 'do_write_html', 'do_write_js']

		return [n for n in dir(self.__class__) if n not in __hiden_methods]


if __name__ == '__main__':
	HelloWorld().cmdloop()
