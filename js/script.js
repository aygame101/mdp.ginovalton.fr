document.addEventListener("DOMContentLoaded", function () {
    const lengthInput = document.getElementById("length");
    const numPasswordsSelect = document.getElementById("numPasswords"); // Liste déroulante
    const lowercaseCheckbox = document.getElementById("lowercase");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const numbersCheckbox = document.getElementById("numbers");
    const specialCharsCheckbox = document.getElementById("specialChars");
    const removeSimilarCheckbox = document.getElementById("removeSimilar");
    const generateButton = document.getElementById("generate");
    const copyButtons = document.querySelectorAll(".copy-button"); // Boutons de copie
    const passwordContainer = document.querySelector(".password-container"); // Conteneur pour les mots de passe

    // Générez dynamiquement les options de 1 à 50
    for (let i = 1; i <= 50; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        numPasswordsSelect.appendChild(option);
    }

    generateButton.addEventListener("click", generatePasswords);

    function generatePasswords() {
        const numPasswords = parseInt(numPasswordsSelect.value); // Nombre de mots de passe à générer
        const length = parseInt(lengthInput.value);
        const useLowercase = lowercaseCheckbox.checked;
        const useUppercase = uppercaseCheckbox.checked;
        const useNumbers = numbersCheckbox.checked;
        const useSpecialChars = specialCharsCheckbox.checked;
        const removeSimilar = removeSimilarCheckbox.checked;

        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numberChars = "0123456789";
        const specialChars = "#$@!?*+=><";
        const similarChars = "oO01Il";

        let allChars = "";

        if (useLowercase) allChars += lowercaseChars;
        if (useUppercase) allChars += uppercaseChars;
        if (useNumbers) allChars += numberChars;
        if (useSpecialChars) allChars += specialChars;

        passwordContainer.innerHTML = ""; // Effacez les mots de passe précédents

        for (let j = 0; j < numPasswords; j++) {
            let password = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * allChars.length);
                let randomChar = allChars.charAt(randomIndex);

                if (removeSimilar) {
                    while (similarChars.includes(randomChar)) {
                        randomChar = allChars.charAt(Math.floor(Math.random() * allChars.length));
                    }
                }

                password += randomChar;
            }

            // Créez un champ d'entrée pour le mot de passe
            const passwordInput = document.createElement("input");
            passwordInput.type = "text";
            passwordInput.value = password;
            passwordInput.readOnly = true;
            passwordContainer.appendChild(passwordInput);

            // Créez un bouton de copie
            const copyButton = document.createElement("button");
            copyButton.textContent = "Copier";
            copyButton.className = "copy-button";
            passwordContainer.appendChild(copyButton);

            // Associez le bouton de copie au champ d'entrée correspondant
            copyButton.addEventListener("click", function () {
                passwordInput.select();
                document.execCommand("copy");
            });
        }
    }
});
