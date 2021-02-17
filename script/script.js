var box = document.querySelector('.row').children;

for(let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', function(e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        console.log(e.clientY);

        var span = document.createElement('span');
            span.className = 'ripple';
        span.style.left = x + 'px';
        span.style.top = y + 'px';

        this.appendChild(span);

        setTimeout(() => {
            span.remove();
        }, 2000);
    });
}