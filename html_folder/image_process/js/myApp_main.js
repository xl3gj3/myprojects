(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  var id = '';
  myApp.config = {
                  id : ""
  };
  myApp.effect_data = {};
  var select_flag = false;
  myApp.file_to_php;
  myApp.effect = "contrast";
  myApp.target;
  myApp.effect_list = [];
  function save_config (cfg){
    console.log("container id is "+cfg.id);
    id = "#" + cfg.id;
    myApp.config.id = "#" + cfg.id;
  }
  myApp.home_page = function (){

    myApp.select_photo_page();
    bind_select_file_ui();
    $(".effect_list_option").show();
    $('.effect_list_option_selection').hide();
  }
  myApp.upload = function (){
    console.log("I will upload file");
    console.log($("#main_input_file").prop("files"));
    var file_data = $("#main_input_file").prop("files")[0];
    if (typeof file_data == "object") {
      // console.log("file to data");
      myApp.file_to_php = file_data;
      // console.log(myApp.file_to_php);
      myApp_ajax.send_data_to_php();
    }else {
      $(`.main_preview_img_container`).html('please select a file');
      console.log("please select a file");
    }
  }
  function readURL(input) {
    if (input.files && input.files[0]) {
        select_flag = true;
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log("e is ",e);
            $('#main_preview_image_field').attr('src', e.target.result);

            myApp.target =  e.target;
            myApp.upload();
        }

        reader.readAsDataURL(input.files[0]);

    }
}
  function bind_select_file_ui (){
    $("#main_input_file").change(function(){
        $(`.main_preview_img_container`).html(`<img id="main_preview_image_field" src="#" alt="your image" />`);
        $(`.main_preview_img_container`).css('background-color',"transparent");
        select_flag = false;
        readURL(this);
        if (!select_flag) {
          $(`.main_preview_img_container`).html(``);
          // $(`.main_preview_img_container`).css('background-color',"white");
        }
    });

  }
  function bind_feature_ui (){
    $(`.effect_list_container`).click(function (){
      var select_feature_id = $(this).attr('id');
      var frame = '';
      var select_feature = Object.keys(myApp.effect_data.small_image[select_feature_id]);
      for (var i = 0; i < select_feature.length; i++) {
        console.log("select img data",myApp.effect_data.small_image[select_feature_id][select_feature[i]]);
        frame = frame + `<div class = "effect_list_container" onclick = "myApp.proess_select_effect('${select_feature[i]}')" id = "${select_feature[i]}">
                          <div class = "effect_list_option_icon" >
                            <img class = "effect_list_option_icon_image" src = "${myApp.effect_data.small_image[select_feature_id][select_feature[i]]}">
                          </div>
                          <div class = "effect_list_option_title">${select_feature[i]}</div>
                        </div>`;
      }
      $('.effect_list_options_container').html(frame);
      // $(`.process_preview_img_container`).html('<img src="' + response.data+ '" />');

      console.log($(this).attr('id'));
      console.log("effect_data",myApp.effect_data.small_image[select_feature_id]);
      $('.main_feature_title').html(select_feature_id);
      $(".effect_list_option").hide("slide", {direction: "left"}, "fast");
      $('.effect_list_option_selection').show("slide", {direction: "right"}, "fast");
    });
  }
  myApp.show_parent_list = function (){
    $(".effect_list_option").show("slide", {direction: "left"}, "fast");
    $('.effect_list_option_selection').hide("slide", {direction: "right"}, "fast");

  }
  myApp.select_photo_page = function (){
    var frame = `

                <div class= "main_layout">
                    <div class = "layout_title">Choose a photo source</div>
                    <div class = "layout_arrow">&darr;</div>
                    <div class = "layout_icon_place_holder">
                        <div style = "display : none">
                          <input type='file' name = "file" id="main_input_file" class = "input_file"  />
                        </div>
                        <label for = "main_input_file" class = "layout_icon">
                            <img class = "upload_icon" src = "../asset/upload_icon.png">
                        </label>
                        <div class = "layout_icon"></div>
                    </div>
                </div>

    `;
    $(`.main_photo_container`).html(frame);
    $('.prohibed_layer').show();

  }
  myApp.build_main_page = function (){
//     var frame = `
//         <nav class="navbar navbar-inverse navbar-fixed-top nav_container_feild">
//         <div class="nav_container_feild">
//            <div class="navbar-header">
//              <a class="navbar-brand main_page_title" href="#">Home</a>
//            </div>
//          </div>
//         </nav>
//         <div id = "content_holder">
//           <div class = "main_button_container">
//             <div class = "main_upload">
//               <button class = "form-control process_form_control" id="upload" onclick = "myApp.upload()">Upload</button>
//             </div>
//             <div class = "main_input_container">
//               <input class = "form-control process_form_control" type='file' id="imgInp" />
//             </div>
//           </div>
//           <div class = "main_input_preview" >
//
//             <div class = "main_image_preview">
//                 <div class = "main_preview_title">Preview</div>
//                 <div class = "main_preview_img_container"></div>
//             </div>
//
//           </div>
//         </div>
// `;
    var frame = `
            <nav class="navbar navbar-inverse navbar-fixed-top nav_container_feild">
            <div class="nav_container_feild">
               <div class="navbar-header">
                 <a class="navbar-brand main_page_title">PhotoEffect</a>
               </div>
             </div>
            </nav>
            <div id = "content_holder">
              <div class = "effect_list">
                  <div class = "effect_list_option"></div>
                  <div class = "effect_list_option_selection">
                      <div class = "main_title_and_goback">
                        <button onclick = "myApp.show_parent_list()" id = "goback_to_parent_list">Back</button>
                        <label for = "goback_to_parent_list" class = "">
                          <div class = "go_back_pointer"><span class ='arrow_container'>&#9664;</span></div>
                          <div class = "main_feature_title"></div>
                        </label>
                      </div>
                      <div class = "effect_list_options_container"></div>
                  </div>
                  <div class = "prohibed_layer"></div>
              </div>
              <div class = "main_photo_container">
                <div class= "main_layout">
                    <div class = "layout_title">Choose a photo source</div>
                    <div class = "layout_arrow">&darr;</div>
                    <div class = "layout_icon_place_holder">
                        <div style = "display : none">
                          <input type='file' name = "file" id="main_input_file" class = "input_file"  />
                        </div>
                        <label for = "main_input_file" class = "layout_icon">
                            <img class = "upload_icon" src = "../asset/upload_icon.png">
                        </label>
                        <div class = "layout_icon"></div>
                    </div>
                </div>
              </div>
            </div>
    `;
    $(`#image_app`).html(frame);
    build_option_field();

  }
  function build_option_field (){
    var frame = `
    <div class = "effect_list_container" id = "filter">
      <div class = "effect_list_option_icon" >
        <img class = "effect_list_option_icon_image" src = "../asset/filter.png">
      </div>
      <div class = "effect_list_option_title">Filter</div>
    </div>
    <div class = "effect_list_container" id = "paint">
      <div class = "effect_list_option_icon">
        <img class = "effect_list_option_icon_image" src = "../asset/paint.jpeg">
      </div>
      <div class = "effect_list_option_title">Paint</div>
    </div>
    <div class = "effect_list_container" id = "sketch">
      <div class = "effect_list_option_icon">
        <img class = "effect_list_option_icon_image" src = "../asset/sketch.jpg">
      </div>
      <div class = "effect_list_option_title">Sketch</div>
    </div>
    `;
    $(".effect_list_option").html(frame);
  }
  myApp.load = function(cfg){
    console.log("load app");
    save_config (cfg);
    myApp_ajax.load();
    myApp.build_main_page();
    bind_select_file_ui();
    bind_feature_ui();
  }
  return myApp;

}))
