document.addEventListener('DOMContentLoaded', createArticle);

fetch("http://localhost:3000/articles")
.then(response => response.json())
.then(data => data.forEach(data => fetchArticles(data)))

//CRUD -> Create, Read, Update and Delete

function fetchArticles(data){
    let articleBody = document.querySelector('.card-body');
    let articleContainer = document.createElement('div');

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

}
fetchArticles();

function createArticle(){
    let articleBody = document.querySelector('.card-body');
    let articleForm = document.querySelector('#form-container');
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
            articleBody.innerHTML += `
                <img src="${data.image}" style="width:250px;height:200px">
                <h3>${data.title}</h3>
                <p>${data.content}</p>  
            
            `
          })
    })
}

