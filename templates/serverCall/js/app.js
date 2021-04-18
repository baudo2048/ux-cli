var compDto = {};

document.register('comp-clicked', ev => {
    document.json('get-comp.php',{compDto:{name:ev.detail}})
        .then(jdoc => {
            compDto = jdoc;
            const ux = JSON.parse(jdoc.jdoc)
            preview.value = ux.ux;
        });
});

document.json('get-comp-names.php')
    .then(jdoc => {
        jdoc.forEach(element => {
            var h = document.createElement('h5');
            h.textContent = element;
            h.onclick = ()=>document.em('comp-clicked',element);
            comps.appendChild(h);
        });

    })

uxBtn.onclick = (ev)=>{
    ev.preventDefault();
    preview.value = JSON.parse(compDto.jdoc).js;
}

previewBtn.onclick = (ev)=>{
    ev.preventDefault();
    let jdoc = JSON.parse(compDto.jdoc);
    let strFunction = parse(compDto.name,jdoc.ux,jdoc.js);
    previewFunc.appendChild(eval(strFunction + compDto.name+"();"));
}

document.register('preview-requested',(ev =>{

}));