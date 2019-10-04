var tagElement = function (element) {
    if (element.charAt(0) === '#') {
        return document.querySelector(element)
    }
    else {
        return document.querySelectorAll(element)
    }
}

var screen = tagElement('#screen'),
    paragraph = tagElement('#paragraph'),
    toldyou = tagElement('#toldyou'),
    body = tagElement('#body'),
    calculator = tagElement('#calculator'),
    reset = tagElement('#reset'),
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
            if(isNaN(result)) {
                result = 'You broke it'
            }
            else {
                result = 'You have broken the calculator'
                calculator.classList.add('broken')
                reset.style.animation = 'in 1s forwards'
                toldyou.classList.add('active')

            }
        }

        if(result == '100'  ) {
            body.classList.add('body2')
        }

    screen.innerHTML = result
    equals.setAttribute('data-result', result)

    backNum = 0
    num = result

}

function resetCalculator () {
        calculator.classList.remove('broken')
        reset.style.animation = 'out 1s forwards'
        toldyou.classList.remove('active')
        clearAll()
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

reset.onclick = resetCalculator