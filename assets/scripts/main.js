let container = document.querySelector('.container');
let ul = document.querySelector('.all_options');
let question = document.querySelector('.question');


let usersAnswer = 0;

let questionArray = [
    {
        question : 'Which water body is to the south of West Bengal?',
        answerIndex : 2,
        options : ['Gulf of Kutch', 'Bay of Bengalcorrect', 'Gulf of Cambay', 'Red Sea']
    },
    
    {
        question : 'Where did the Portuguese have a factory in West Bengal?',
        answerIndex : 3,
        options : ['Barrackpore', 'Asansol', 'Jadavpur', 'Hooghly']
    },

    {
        question : 'When did the French vacate Chandernagore?',
        answerIndex : 0,
        options : ['1949', '1961', '1975', '1954']
    },

    {
        question : 'Who was West Bengal’s chief minister in 1980?',
        answerIndex : 2,
        options : ['Siddharth Shankar Ray', 'Asoke Sen', 'Jyoti Basu', 'Ajoy Bose']
    },

    {
        question : 'Total Number of Lok Sabha seats in West Bengal?',
        answerIndex : 2,
        options : ['45', '43', '41', '47']
    },

    {
        question : 'Who was the first person from West Bengal to win Bharat Ratna Award?',
        answerIndex : 3,
        options : ['Aruna Asaf Ali', 'Ravi Shankar', 'Satyajit Ray', 'Bidhan Chandra Roy']
    }
];


function getAnswer(event) {

    let option = document.querySelectorAll('.option');
    let markColor  = 'rgb(230, 226, 226)';

    option.forEach(el => el.style.backgroundColor = '#fff'); // Unmark
    

    if(event.target.className == 'option') {
        let radioBtn = event.target.children[0];
        radioBtn.checked = true;
        usersAnswer = radioBtn.value;   
        
        event.target.style.backgroundColor = markColor;
        
    } else {
        usersAnswer = event.target.parentNode.dataset.id;
        event.target.parentNode.style.backgroundColor = markColor;
    } 
    
    console.log(usersAnswer);
}



function render(event) {
    
    console.log(true);
    if(event.target.className.split(' ').includes = 'next') {
        this.currentQuestion++;
    } else {
        this.currentQuestion--;
    }

    quiz.display();

}

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
        console.log('this', this.allQuestions);
    }

    display() {
        // console.log(false);  
        let current = this.allQuestions[this.currentQuestion];
        question.innerHTML = current.question;

        let btns = document.querySelector('.btns');
        btns.innerHTML = `<button class="skip btn">Skip</button>
                          <button class="next btn">Next</button>`;
                          

        let lis = '';
        
        for(let i = 0; i < current.options.length; i++) {
            
            lis += `<li class="option" data-id = ${i}>
                        <input type="radio" name = "option" id="option_${i}" value = "${i}">
                        <label for="option_${i}">${current.options[i]}</label>
                    </li>`;
        }

        ul.innerHTML = lis;
        // setInterval(this.render,1000);
        let option = document.querySelectorAll('.option');

        option.forEach(el => {
            el.children[0].checked = false;

            el.style.backgroundColor = '#fff';
            el.children[0].style.display = 'none'; 

            el.addEventListener('click', getAnswer);

        });

        let next = document.querySelector('.next');
        let skip = document.querySelector('.skip');
       
        next.addEventListener('click', render);
        skip.addEventListener('click', render);

    }

}

let quiz = new handleQuestion(questionArray,0);
