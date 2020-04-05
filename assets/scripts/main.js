let container = document.querySelector('.container');
let ul = document.querySelector('.all_options');
let question = document.querySelector('.question');
let questionList = document.querySelector('.question_nos');
let showListBtn = document.querySelector('.jump');

let allPlayer = JSON.parse(localStorage.getItem('allPlayer')) || [];

let usersAnswer = [];

let markColor  = `rgb(230, 226, 226)`;

function getAnswer(event) {
    event.stopPropagation();

    let currentQuestion = quiz.currentQuestion;
    let option = document.querySelectorAll('.option');
    
    let id = event.target.dataset.id || event.target.parentNode.dataset.id;
    let li = '';

    // debugger;

    if(event.target.className == 'option') {
        li = event.target;
        
    } else {
        li = event.target.parentNode;
    }
    
    option.forEach(el => el.style.backgroundColor = 'transparent'); // Unmark
    
    // if(event.target.className == 'option' || event.target.hasAttribute('for')) {
        let radioBtn = li.children[0];
        radioBtn.checked = !radioBtn.checked;
        // radioBtn.checked = !radioBtn.checked;
        usersAnswer = radioBtn.value;   
        console.log(radioBtn.checked);
        
        localStorage.setItem('allPlayer',JSON.stringify(allPlayer));
    // }

    let obj = {
        questionNo : currentQuestion,
        usersAnswer : +usersAnswer,
        correctAnswer : questionArray[currentQuestion].answerIndex,
        points : 0
    }

    if(!player1.answers[currentQuestion]) {
        player1.answers.push(obj);
    } else {
        player1.answers[currentQuestion].usersAnswer = +usersAnswer;
    }

    if(radioBtn.checked) {
        li.style.backgroundColor = markColor;
       
        
    } else {
        li.style.backgroundColor = 'transparent';
        console.log(player1.answers);
        player1.answers.splice(currentQuestion, 1);
    }

    localStorage.setItem('allPlayer',JSON.stringify(allPlayer));
    
}



function render(event) {

    player1.updateScore(quiz.currentQuestion)

    if(event.target.classList.contains('next') ) {
        if(quiz.currentQuestion + 1 < questionArray.length) {
            quiz.currentQuestion += 1;
            quiz.display();
        }
    } 
    
    else if(event.target.classList.contains('prev') ) {

        if(quiz.currentQuestion - 1 >= 0) {
            quiz.currentQuestion -= 1;
            quiz.display();
        }
        
    }
}

// Classes

// Player Related

class Player {
    constructor(userName, allQuestions = [], score = 0) {
        this.userName = userName;
        this.allQuestions = allQuestions;
        this.score = score;
        this.id = Date.now() + Math.floor((Math.random() * 5)+1);
        this.answers = []
        
    }

    updateScore(currentQuestion) {

        let current = this.answers[currentQuestion];

        if(current) {
           
            if(current.usersAnswer == current.correctAnswer) {
                current.points = +20; 
                
            } else {
                
                current.points = -10;
            }
        }
        this.total()
        localStorage.setItem('allPlayer',JSON.stringify(allPlayer));
        console.log(allPlayer);
    }

    editUserName(newName = this.userName) {
        this.userName = newName;
    }

    total() {
        this.score = this.answers.reduce( (acc, cv) => acc + cv.points ,0);
        
    }
}


// Question Related

class handleQuestion {
    constructor(allQuestions = [], currentQuestion) {
        this.allQuestions = allQuestions;
        this.currentQuestion = currentQuestion;
    }

    addQuetstion(question, answerIndex, options = []) {
        let quesObj = {
            question : question,
            answerIndex : answerIndex,
            options : options
        };
        this.allQuestions.push(quesObj);
    }

    removeQuestion(qno) {
        this.allQuestions.splice(qno-1, 1);
    }

    editQuetstion(qno, question, answerIndex, options = []) {
        let editObj = {
            question : question,
            answerIndex : answerIndex,
            options : options
        };
        this.allQuestions.splice(qno,1,editObj);
       
    }

    display() {
      
        let current = this.allQuestions[this.currentQuestion];
        let lis = '';
        let btns = document.querySelector('.btns');
        
        question.innerHTML = current.question;

        btns.innerHTML = `<button class="prev btn">Previous</button>
                         
                          <button class="next btn">Next</button>`;
                          
        for(let i = 0; i < current.options.length; i++) {
            
            lis += `<li class="option" data-id = ${i}>
                        <input type="radio" name = "option" id="option_${i}" value = "${i}">
                        <span>${current.options[i]}</span>
                    </li>`;
        }

        ul.innerHTML = lis;
        
        let option = document.querySelectorAll('.option');

        option.forEach((el, index) => {
            
            // el.children[0].checked = false;

            el.children[0].style.display = 'none'; 

            // el.children.forEach(item => item.addEventListener('click', getAnswer))
            // ;

            let eachLiItem = el.children;

            el.addEventListener('click', getAnswer);
            Array.from(eachLiItem).forEach((item, index) => {
                if(index <= 1) {
                    item.addEventListener('click', getAnswer);
                }
            })


            if(player1.answers[this.currentQuestion]) {
                if(player1.answers[this.currentQuestion].usersAnswer == el.dataset.id) {
                    el.style.backgroundColor = markColor;
                    el.children[0].checked = true;
                } 
            }

            
        });

        for(let i = 0; i < questionArray.length; i++) {
            
            let li = document.createElement('li');
            li.setAttribute('data-qno',`${i}`);
            li.className = 'qno';
            li.innerHTML = `${i+1}`
            
            questionList.append(li);
        }

        let next = document.querySelector('.next');
        let prev = document.querySelector('.prev');
       
        next.addEventListener('click', render);
        prev.addEventListener('click', render);
    }
}

// function handleJump() {
    
// }




// showListBtn.addEventListener('click', handleJump);

allPlayer.push(new Player('Sanjib',questionArray,0));

localStorage.setItem('allPlayer',JSON.stringify(allPlayer));

let player1 = allPlayer[allPlayer.length - 1];
let quiz = new handleQuestion(questionArray,0);

localStorage.setItem('quiz',JSON.stringify(quiz));

