let select = document.getElementById("select-menu");
let saveSelectValue;
select.addEventListener("click", () => {
  let select = document.getElementById("select-menu");
  saveSelectValue = select.options[select.selectedIndex].value;
  console.log(saveSelectValue);
});

let saveInputValue;
let flag;
let input = document.getElementById("input-algorithem");
input.addEventListener("input", () => {
  saveInputValue = input.value;
  if (saveSelectValue === "palindrome") flag = palindrome(saveInputValue);
  else if (saveSelectValue === "prime") flag = prime(saveInputValue);
  else if (saveSelectValue === "password") flag = password(saveInputValue);
  else if (saveSelectValue === "unique") flag = unique(saveInputValue);
  console.log("flag" + flag);
  if (flag === true) input.style.backgroundColor = "green";
  else if (flag === false) input.style.backgroundColor = "red";
  if (saveInputValue.length == 0) input.style.backgroundColor = "white";
});

palindrome = (input) => {
  console.log("hey");
  const mid = input.length / 2;
  for (let i = 0; i < mid; i++)
    if (input[i] !== input[input.length - 1 - i]) return false;
  return true;
};

prime = (saveInputValue) => {
  if (saveInputValue < 2) return false;
  for (let i = 2; i < saveInputValue; i++) {
    if (saveInputValue % i === 0) return false;
  }
  return true;
};

password = (saveInputValue) => {
  if (
    saveInputValue.length >= 8 &&
    /[A-Z]/.test(saveInputValue) &&
    /[a-z]/.test(saveInputValue) &&
    /[0-9]/.test(saveInputValue) &&
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(saveInputValue)
  )
    return true;
  return false;
};
unique = (saveInputValue) => {
  for (let i = 0; i < saveInputValue.length; i++)
    for (let j = i + 1; j < saveInputValue.length; j++)
      if (saveInputValue[i] == saveInputValue[j]) return false;

  return true;
};

let saveTextInput;
let saveNumberInput;
let textInput = document.getElementById("input-string");
textInput.addEventListener("input", () => {
  saveTextInput = textInput.value;
  console.log(saveTextInput);
});
let numberInput = document.getElementById("input-number");
numberInput.addEventListener("input", () => {
  saveNumberInput = numberInput.value;
  console.log(saveNumberInput);

});
let encryptBtn =document.getElementById("encrypt");

encryptBtn.addEventListener("click",() => {
    let index;
    let count=saveNumberInput;
    let encrypted="";
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (let i=0; i<saveTextInput.length;i++){
        count--;
        index=alphabet.indexOf(saveTextInput[i])+Number(saveNumberInput);
        if (index>alphabet.length-1) index=0+count;
        encrypted+=alphabet[index];
    }
    console.log("encrypted="+encrypted);
    textInput.value = "ecrypted: "+encrypted;

    return encrypted;
});

let decryptByn =document.getElementById("decrypt");
decryptByn.addEventListener("click",()=> {
    let index;
    count=saveNumberInput;
    let encrypted="";
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (let i=0; i<saveTextInput.length;i++){
        count--;
        index=alphabet.indexOf(saveTextInput[i])-Number(saveNumberInput);
        if (index<0) index=(alphabet.length-1) -count;
        encrypted+=alphabet[index];
    }
    textInput.value = "decrypted: "+encrypted;
})
