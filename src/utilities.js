// Checks if the user input is a valid string
function validateInput(input){
	if (!input || !input.trim()){
		return false;
	}
	else {
		return true;
	}
}

function updateUI(output, previous){
	output = `${output}<br/>${previous}`
}

export {validateInput, updateUI};