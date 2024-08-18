window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  

function createProgressBar(maximumProgress, currentProgress, color = '#97BE5A', targetDivIdentifier) {
    const targetDivSelector = `[data-acc-text="${targetDivIdentifier}"]`;
    let targetDiv = document.querySelector(targetDivSelector);
    if (!targetDiv) {
        console.error("Target div not found");
        return;
    }
    
    targetDiv.innerHTML = '';
    const progressBarContainer = document.createElement('div');
    progressBarContainer.style.position = 'relative';
    progressBarContainer.style.width = '100%';
    progressBarContainer.style.height = '100%';
    progressBarContainer.style.backgroundColor = '#e0e0e0';
    progressBarContainer.style.borderRadius = '0px';
    progressBarContainer.style.overflow = 'hidden';
    progressBarContainer.dataset.maximumProgress = maximumProgress;
    progressBarContainer.dataset.targetDiv = targetDivIdentifier;

    const progressBar = document.createElement('div');
    progressBar.style.height = '100%';
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = color;
    progressBar.style.transition = 'width 0.5s ease';

    progressBarContainer.appendChild(progressBar);
    targetDiv.appendChild(progressBarContainer);

    updateProgressBar(currentProgress, targetDivIdentifier);
}
createProgressBar(100, 0, '#1E201E', 'progressbar');
}

window.Script2 = function()
{
  function updateProgressBar(currentProgress, targetDivIdentifier) {
    const targetDivSelector = `[data-acc-text="${targetDivIdentifier}"]`;
    let targetDiv = document.querySelector(targetDivSelector);
    if (!targetDiv) {
        console.error("Target div not found");
        return;
    }
    
    const progressBarContainer = targetDiv.querySelector('div');
    if (progressBarContainer) {
        const maximumProgress = progressBarContainer.dataset.maximumProgress;
        const progressBar = progressBarContainer.querySelector('div');
        if (progressBar) {
            const progressPercentage = (currentProgress / maximumProgress) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }
}
function CreateInput(dataAttr, storylineVariable, options = {}) {
    var player = GetPlayer();
    var setVar = player.SetVar;
    const selectElement = document.querySelector(`div[data-acc-text='${dataAttr}']`);

    if (!selectElement) {
        console.error(`Element with data-acc-text='${dataAttr}' not found.`);
        return;
    }

    const input = document.createElement('input');
    const inputId = `input-${storylineVariable}`;
    input.id = inputId;

    input.style.width = '100%';
    input.style.height = '100%';
    input.style.boxSizing = 'border-box';
    input.style.backgroundColor = options.backgroundColor || 'white';
    input.style.color = options.textColor || 'black';
    input.style.border = options.border || '1px solid black';
    input.style.fontSize = options.fontSize || '13px';

    input.type = options.type || 'text';

    if (options.placeholder) {
        input.placeholder = options.placeholder;
    }

    if (options.defaultValue !== undefined) {
        input.value = options.defaultValue;
        setVar(storylineVariable, options.defaultValue);
    }

    selectElement.appendChild(input);

    function checkPasswordRequirements(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;

        // Update Storyline variables
        setVar("case", hasUpperCase && hasLowerCase);
        setVar("char8", hasMinLength);
        setVar("numbers", hasNumber);
        setVar("spchar", hasSpecialChar);

        // Calculate progress
        let progress = 0;
        if (hasUpperCase && hasLowerCase) progress += 25;
        if (hasMinLength) progress += 25;
        if (hasNumber) progress += 25;
        if (hasSpecialChar) progress += 25;

        // Update progress bar
        updateProgressBar(progress, 'progressbar');
    }

    input.addEventListener('input', function() {
        const value = input.value;
        setVar(storylineVariable, value);
        checkPasswordRequirements(value);
    });

    input.addEventListener('blur', function() {
        const value = input.value;
        setVar(storylineVariable, value);
        checkPasswordRequirements(value);
    });
}


CreateInput('TextEntry Enter Your Password', 'password', {
	type: 'password',
	placeholder: 'Enter your password',
    backgroundColor: 'white',
    textColor: 'black',
    border: '1px solid black',
    fontSize: '18px',
    defaultValue: ''
});
}

window.Script3 = function()
{
  function TogglePasswordVisibility(storylineVariable) {
    const input = document.getElementById(`input-${storylineVariable}`);

    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    } else {
        console.error(`Input with id 'input-${storylineVariable}' not found.`);
    }
}

TogglePasswordVisibility('password');

}

};
