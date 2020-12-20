const url = "http://localhost:5000/images"
const imageFolder = "uploads/";
fetch(url)
        .then(res => res.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            data.forEach(elem => {
                let div = document.createElement('div');
                div.className = "photo-wrapper";
                let caption = document.createElement('h4');
                caption.innerText = elem.caption;
                div.appendChild(caption);
                let img = document.createElement('img');
                img.className = "image";
                img.src = imageFolder + elem.name;
                div.appendChild(img);
                gallery.appendChild(div);
            });
        })