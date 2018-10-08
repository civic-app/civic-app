$(document).ready(function(){
    $(".delete_model").on("click",function(e){
        $target = $(e.target);
        const id = $target.attr("data-id");
        console.log(id);
        $.ajax({
            type: "DELETE",
            url: "/model/" + id,
            success: function(response){
                window.location.href = "/";
            },
            error: function(err){
                console.log(err)
            }
        });
    })
})
