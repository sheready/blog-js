document.addEventListener('DOMContentLoaded', () => {
    
    let allArticles = [];

    fetch("http://localhost:3000/articles")
    .then(response => response.json())
    .then(data => data.forEach(data => {
        fetchArticles(data);
        allArticles.push(data);
    }))

   

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
        articleContainer.style.height = "320px";
        articleContainer.style.marginLeft = "20px";

        articleContainer.addEventListener('click', () => {
            fetch(`http://localhost:3000/articles/${data.id}`) 
            .then(response => response.json())
            .then(data => {
                articleDetails.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.content}</p>  
                <button id="edit" data-id="${data.id}" data-action="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                <button data-id="${data.id}" data-action="delete">Delete</button>
            
            `
            })
        })

        articleDetails.addEventListener('click', (e) => {
            console.log(e.target);
            if(e.target.dataset.action === 'edit'){
                const allData = allArticles.find(article => {
                    return article.id == e.target.dataset.id
                })
                articleContainer.innerHTML += `
                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">You are editing the article with id ${allData.id}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div id="edit-article">
                        <form id="form-container-edit">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Your article title</label>
                                <input type="text" id="title" class="form-control" id="exampleFormControlInput1" placeholder="${allData.title}">
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Your article content</label>
                                <textarea id="content" placeholder="${allData.content}" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="basic-url" class="form-label">Your image URL</label>
                                <input type="text" class="form-control" placeholder="${allData.image}" id="basic-url" aria-describedby="basic-addon3">
                            </div>
                            <button type="submit" class="btn btn-success">Edit your article</button>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                `
                let editForm = document.querySelector('#form-container-edit');

                editForm.addEventListener('submit', (e) => {
                    console.log(e.target);
                    e.preventDefault();

                    const titleInput = editForm.querySelector('#title').value
                    const contentInput = editForm.querySelector('#content').value
                    const imageInput = editForm.querySelector('#basic-url').value

                    fetch(`http://localhost:3000/articles/${allData.id}`, {
                        method: "PATCH",
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
                        
                        `
                    })
            
                    articleBody.appendChild(articleContainer);
                    articleContainer.appendChild(articleDetails);
                    articleContainer.style.height = "320px";
                    articleContainer.style.marginLeft = "20px";

                    articleContainer.addEventListener('click', () => {
                        fetch(`http://localhost:3000/articles/${allData.id}`) 
                        .then(response => response.json())
                        .then(data => {
                            articleDetails.innerHTML = `
                            <h3>${data.title}</h3>
                            <p>${data.content}</p>  
                            <button id="edit" data-id="${data.id}" data-action="edit">Edit</button>
                            <button data-id="${data.id}" data-action="delete">Delete</button>
                        
                        `
                        })
                    })


                })




            }else if(e.target.dataset.action === 'delete'){
                console.log("delete was clicked")
            }

        })
    

    }
    fetchArticles();

});
    


function createArticle(){
    let articleBody = document.querySelector('.card-body');
    let articleContainer = document.createElement('div');
    let articleForm = document.querySelector('#form-container');
    articleContainer.className = "articles";

    articleForm.addEventListener('submit', (e) => {
        console.log(e.target);
        e.preventDefault();
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
            
            `
        })

        articleBody.appendChild(articleContainer);
        articleContainer.appendChild(articleDetails);
        articleContainer.style.height = "320px";
        articleContainer.style.marginLeft = "20px";

        articleContainer.addEventListener('click', () => {
            fetch(`http://localhost:3000/articles/${data.id}`) 
            .then(response => response.json())
            .then(data => {
                articleDetails.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.content}</p>  
                <button id="edit" data-id="${data.id}" data-action="edit">Edit</button>
                <button data-id="${data.id}" data-action="delete">Delete</button>
            
            `
            })
        })
    })
}
createArticle();
