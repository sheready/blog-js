document.addEventListener('DOMContentLoaded', createArticle);

fetch("http://localhost:3000/articles")
.then(response => response.json())
.then(data => data.forEach(data => fetchArticles(data)))



//CRUD -> Create, Read, Update and Delete

function fetchArticles(data){
    let articleBody = document.querySelector('.card-body');
    let articleContainer = document.createElement('div');
    let articleDetails = document.createElement('div');
    articleContainer.className = "articles";

    articleContainer.innerHTML = `
        <img src="${data.image}" style="width:250px;height:200px">
       
    `
    articleBody.appendChild(articleContainer);
    articleContainer.appendChild(articleDetails);
    articleContainer.style.height = "280px";
    articleContainer.style.marginLeft = "20px";


    

    articleContainer.addEventListener('click', () => {
        fetch(`http://localhost:3000/articles/${data.id}`) 
        .then(response => response.json())
        .then(data => {
            articleDetails.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.content}</p>  
        
        `
        })
    })
   

}
fetchArticles();


function createArticle(){
    let articleBody = document.querySelector('.card-body');
    let articleContainer = document.createElement('div');
    let articleForm = document.querySelector('#form-container');
    articleContainer.className = "articles";
    articleForm.addEventListener('submit', (e) => {
    e.preventDefault();

        console.log(e.target);
        const titleInput = articleForm.querySelector('#title').value
        const contentInput = articleForm.querySelector('#content').value
        const imageInput = articleForm.querySelector('#basic-url').value

        fetch('http://localhost:3000/articles', {
            method: "POST",
            body: JSON.stringify({
                title: titleInput,
                content: contentInput,
                image: imageInput
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .then(data => {
            articleContainer.innerHTML = `
                <img src="${data.image}" style="width:250px;height:200px">
                <h3>${data.title}</h3>
                <p>${data.content}</p>  
            
            `
            articleBody.appendChild(articleContainer);
            articleContainer.style.display = "flex";
            articleContainer.style.flexDirection = "row";
            articleContainer.style.flexWrap = "wrap";
            articleContainer.style.marginLeft = "5px";
          })
    })
}

