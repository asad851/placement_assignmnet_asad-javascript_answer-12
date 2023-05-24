let blogContainer = document.querySelector(".blogs");
let seacrhBar = document.querySelector(".searchBar");
let submitBtn = document.querySelector(".submitBtn");
let form =document.querySelector('.searchbox')
let bodyinput = document.getElementById('bodyInput')

fetch('https://jsonplaceholder.typicode.com/posts')
.then((response)=>response.json())
.then((res)=>{

res.map((res)=>{
    let blogbox = document.createElement('div')
    blogbox.setAttribute('class','blogbox')
   
    let title = document.createElement('h3');
    let body=document.createElement('p')
    
    title.innerHTML=res.title
    body.innerHTML=res.body

    
    blogbox.appendChild(title)
    blogbox.appendChild(body)
    blogContainer.appendChild(blogbox)
})

}
)
.catch((err)=>console.log("error:",err))

form.addEventListener('submit',(event)=>{
   event.preventDefault();
   const newBlog={
    title:seacrhBar.value,
    body:bodyinput.value,

   }
   fetch('https://jsonplaceholder.typicode.com/posts',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(newBlog)
   })
   .then((response)=>response.json())
   .then((data)=>{
    console.log(data)
    let blogbox = document.createElement('div')
    blogbox.setAttribute('class','blogbox')
    blogbox.setAttribute('id',`blog-${data.id}`)
   
    let title = document.createElement('h3');
    let body=document.createElement('p');
    let deleteBtn =document.createElement('button') ;
    deleteBtn.setAttribute('class','deleteBtn')
    deleteBtn.textContent="Delete"
    deleteBtn.addEventListener('click',()=>deleteBlog(data.id))
    title.innerHTML=data.title
    body.innerHTML=data.body

    
    blogbox.appendChild(title)
    blogbox.appendChild(body)
    blogbox.appendChild(deleteBtn)
    blogContainer.appendChild(blogbox)

    seacrhBar.value=''
    bodyinput.value=''
   })
   .catch((error)=>{
    console.log("Error:",error)
   })
})

function deleteBlog(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method:"DELETE",
    })
    .then(()=>{
       const blogDiv = document.getElementById(`blog-${id}`)
       blogDiv.remove()
    })
    .catch((err)=>{
        console.log("error :",err)
    })
}