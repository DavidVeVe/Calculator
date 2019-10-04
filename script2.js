var tagElement = function (element) {
    if (element.charAt(0) === '#') {
        return document.querySelector(element)
    }
    else {
        return document.querySelectorAll(element)
    }
}

var screen = tagElement('#screen'),
    calculator = tagElement('#calculator'),
    equals = tagElement('#equals'),
    clear = tagElement('#clear'),
    numbers = tagElement('.num'),
    ops = tagElement('.ops'),
    num = '',
    backNum = '',
    result,
    operator

var startNum = function () {
    if(result) {
        num = this.getAttribute('data-num')
        result = ''
    }
    else {
        num += this.getAttribute('data-num')
    }
    screen.innerHTML = num
}

var moveNumber = function () {
    backNum = num
    num = ''
    operator = this.getAttribute('data-op')
    equals.setAttribute('data-result', '')
}

var displayResult = function () {

    backNum = parseFloat(backNum)
    num = parseFloat(num)

    switch (operator) {
        case 'plus':
            result = backNum + num
        break

        case 'minus':
            result = backNum - num
        break

        case 'mult':
             result = backNum * num
        break

        case 'divide':
            result = backNum / num
        break

        default:
            result = num
        }

        if(!isFinite(result)) {
            result = 'You have broken the calculator'
            calculator.classList.add('broken')
        }

    screen.innerHTML = result
    equals.setAttribute('data-result', result)

    backNum = 0
    num = result

}

function clearAll () {
    backNum = ''
    num = ''
    screen.innerHTML = '0'
    equals.setAttribute('data-result', result)
}

for (var i = 0; i < numbers.length; i++) {
    numbers[i].onclick = startNum
}

for (var i = 0; i < ops.length; i++) {
    ops[i].onclick = moveNumber
}

equals.onclick = displayResult

clear.onclick = clearAll