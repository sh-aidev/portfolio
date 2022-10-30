// import data from 'assets/js/imagenet_classes.json' assert { type: 'JSON' };
(function ($) {
    "use strict";

    //Project 1 Details:
    //UI Project Button Click Function
    $('#btn-p1').on('click', function (event) {
        $('#portfolio-container').fadeToggle(500);
        $('#p1').fadeToggle(1000);

    });

    // Project panel back Button Click Function
    $('#btn-back-p1').on('click', function (event) {
        $('#portfolio-container').fadeToggle(1000);
        $('#p1').fadeToggle(500);
        $('#loading-img-p1').hide();
        $('#btn-classify-p1').hide();
        $('#aws-start-p1').show();
        $('#aws-caution').show();
        $('#drpdwn-p1').parents('.dropdown').find('input').attr('value', "");
        $('#drpdwn-p1').parents('.dropdown').find('span').text("Select Model");
        document.getElementById('idImage').src = "";
        $('#resnet34FieldUpload').val("");
        $('#error').text("");
        $('#success').html('');
        $('#model-desc-p1').hide();
        $('#model-desc-imagenet-p1').hide()
    });

    // Project 1 AWS Cold Start Button
    $('#aws-start-p1').on('click', function (event) {
        if (($('#drpdwn-p1').parents('.dropdown').find('span').text()!="Select Model") && ($("#resnet34FieldUpload").val() != '')){
            $('#error').text("");
            $('#success').html('');
            let URL = null;
            switch ($('#drpdwn-p1').parents('.dropdown').find('span').text()) {
                case "ResNet34":
                    URL = 'https://8iy9xm49rf.execute-api.ap-south-1.amazonaws.com/dev/detect';
                    break;
                case "Inception V3":
                    URL = 'https://q82h6jxzdb.execute-api.ap-south-1.amazonaws.com/dev/detect';
                    break;
                case "Mobilenet V2":
                    URL = 'https://efgu87f9b5.execute-api.ap-south-1.amazonaws.com/dev/detect';
                    break;
                case "Custom Resnet":
                    URL = 'https://x0emi4l3h9.execute-api.ap-south-1.amazonaws.com/dev/detect';
                    break;
              }
            $('#loading-img-p1').fadeToggle(50);
            $('#aws-start-p1').fadeToggle(500);
            $('#aws-caution').fadeToggle(500);
            $('#btn-back-p1').fadeToggle(500);

            function show_classify_section(){
                $('#loading-img-p1').fadeToggle(50);
                $('#btn-classify-p1').fadeToggle(1000);
                $('#btn-back-p1').fadeToggle(1000);
            };

            var fileInput = document.getElementById('resnet34FieldUpload').files;
            
            var file = fileInput[0];
            var filename = file.name;
        
            var formData = new FormData();
            formData.append(filename, file);

            $.ajax({
                async: true,
                crossDomain: true,
                method: 'POST',
                url: URL,
                data: formData,
                processData: false,
                contentType: false,
                mimeType: "multipart/form-data"
            })
            .done(function (response) {
                window.setTimeout( show_classify_section, 100 );
            })
            .fail(function() {window.setTimeout( show_classify_section, 30000 );}); 
        }else{
            if (($('#drpdwn-p1').parents('.dropdown').find('span').text()=="Select Model") && ($("#resnet34FieldUpload").val() != '')){
                $('#error').text("Please select a Model from Dropdown Menu");
                
            }
            else if (($("#resnet34FieldUpload").val() == '') && ($('#drpdwn-p1').parents('.dropdown').find('span').text()!="Select Model")){
                $('#error').text("Please choose a file to upload first");
            }
            else if (($("#resnet34FieldUpload").val() == '') && ($('#drpdwn-p1').parents('.dropdown').find('span').text()=="Select Model")){
                $('#error').text("Please select a Model from Dropdown & choose a file to upload first");
            }
        }
    });

    // Project 1 DropDown Menu Functionality
    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        $('#btn-classify-p1').hide();
        $('#aws-start-p1').show();
        $('#aws-caution').show();
        $('#success').html('');
        $('#model-desc-p1').show();
        $('#model-desc-imagenet-p1').hide()
        if($(this).parents('.dropdown').find('span').text() == "Custom Resnet"){
            $('#model-desc-text-p1').text("Custom Model was trained on ['cheetah', 'fox', 'hyena', 'lion', 'tiger', 'wolf'] - these class images");
        }
        else{
            $('#model-desc-imagenet-p1').show()
            $('#model-desc-text-p1').text("Pretrained Imagenet Model with 1000 class images.");
        }
    });
    
    $('#resnet34FieldUpload').on('change', function() {
        $('#success').html('');
        // An empty img element
        let demoImage = document.getElementById('idImage');
        // read the file from the user
        let file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            demoImage.src = reader.result;
        }
        reader.readAsDataURL(file);
      });

    // Project 1 AWS Cold Start Button
    $('#btn-classify-p1').on('click', function (event) {
        $('#error').text("");
        let URL = null;
        let data_classes = null;
        switch ($('#drpdwn-p1').parents('.dropdown').find('span').text()) {
            case "ResNet34":
                URL = 'https://8iy9xm49rf.execute-api.ap-south-1.amazonaws.com/dev/detect';
                data_classes = imagenet_classes;
                break;
            case "Inception V3":
                URL = 'https://q82h6jxzdb.execute-api.ap-south-1.amazonaws.com/dev/detect';
                data_classes = imagenet_classes;
                break;
            case "Mobilenet V2":
                URL = 'https://efgu87f9b5.execute-api.ap-south-1.amazonaws.com/dev/detect';
                data_classes = imagenet_classes;
                break;
            case "Custom Resnet":
                URL = 'https://x0emi4l3h9.execute-api.ap-south-1.amazonaws.com/dev/detect';
                data_classes = custom_classes;
                break;
            }

        var fileInput = document.getElementById('resnet34FieldUpload').files;
    
        var file = fileInput[0];
        var filename = file.name;
    
        var formData = new FormData();
        formData.append(filename, file);

        $.ajax({
            async: true,
            crossDomain: true,
            method: 'POST',
            url: URL,
            data: formData,
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data"
        })
        .done(function (response) {
            console.log(response);
            const pred = JSON.parse(response);

            const classes = data_classes;

            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success')
                    .append("<strong>Predicted Class: "+ classes[pred.pridction.first.idx].toUpperCase() +"</strong>");
            $('#success > .alert-success')
                    .append('</div>');
        })
        .fail(function() {
                    $('#btn-classify-p1').hide();
                    $('#aws-start-p1').show();
                    $('#aws-caution').show();
        });  
    });


    //Project 2 Details:
    //UI Project Button Click Function
    $('#btn-p2').on('click', function (event) {
        $('#portfolio-container').fadeToggle(500);
        $('#p2').fadeToggle(1000);
    });
    const videoElement = $('#input-video-face-landmark .input_video')[0];
    
    $('#btn-back-p2').on('click', function (event) {
        $('#portfolio-container').fadeToggle(1000);
        $('#p2').fadeToggle(500);
        $('#landmark-div').addClass('hidden');
        $('#face-landmarks-p2').addClass('hidden');
        $('#face-recognition-p2').addClass('hidden');
        $('#drpdwn-p2').parents('.dropdown').find('input').attr('value', "");
        $('#drpdwn-p2').parents('.dropdown').find('span').text("Select Application");
        stopStreamedVideo(videoElement);
    });

    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        if ($(this).parents('.dropdown').find('span').text()=="Face Landmarks"){
            $('#face-landmarks-p2').removeClass('hidden');
            $('#face-recognition-p2').addClass('hidden');
        }
        else if($(this).parents('.dropdown').find('span').text()=="Face Recognition"){
            $('#face-landmarks-p2').addClass('hidden');
            $('#face-recognition-p2').removeClass('hidden');
        }
    });

    $('#btn-landmarks-p2').on('click', function (event) {
        $('#landmark-div').removeClass('hidden');
        const canvasElement = $('#output-canvas-face-landmark .output_canvas')[0];
        const canvasCtx = canvasElement.getContext('2d');
        
        function onResults(results) {
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          canvasCtx.drawImage(
              results.image, 0, 0, canvasElement.width, canvasElement.height);
          if (results.multiFaceLandmarks) {
            for (const landmarks of results.multiFaceLandmarks) {
              drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                             {color: '#C0C0C070', lineWidth: 0.5});
              drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF3030'});
              drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
              drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
              drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#30FF30'});
              drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
              drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {color: '#30FF30'});
              drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
              drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: '#E0E0E0'});
            }
          }
          canvasCtx.restore();
        }
        
        const faceMesh = new FaceMesh({locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }});
        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
        faceMesh.onResults(onResults);
        
        const camera = new Camera(videoElement, {
          onFrame: async () => {
            await faceMesh.send({image: videoElement});
          },
          width: 500,
          height: 333
        });
        camera.start();
    });

    //Project 3 Details:
    //UI Project Button Click Function
    $('#btn-p3').on('click', function (event) {
        $('#portfolio-container').fadeToggle(500);
        $('#p3').fadeToggle(1000);
    });

    const videoElement2 = $('#input-video-hand-pose .input_video')[0];

    $('#btn-back-p3').on('click', function (event) {
        $('#portfolio-container').fadeToggle(1000);
        $('#p3').fadeToggle(500);
        $('#hand-pose-div').addClass('hidden');
        $('#hand-pose-p3').addClass('hidden');
        $('#body-pose-p3').addClass('hidden');
        $('#drpdwn-p3').parents('.dropdown').find('input').attr('value', "");
        $('#drpdwn-p3').parents('.dropdown').find('span').text("Select Application");
        stopStreamedVideo(videoElement2);
    });

    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        if ($(this).parents('.dropdown').find('span').text()=="Hand Pose"){
            $('#hand-pose-p3').removeClass('hidden');
            $('#body-pose-p3').addClass('hidden');
        }
        else if($(this).parents('.dropdown').find('span').text()=="Body Pose"){
            $('#hand-pose-p3').addClass('hidden');
            $('#body-pose-p3').removeClass('hidden');
        }
    });

    $('#btn-hand-pose-p3').on('click', function (event) {
        $('#hand-pose-div').removeClass('hidden');
        const canvasElement = $('#output-canvas-hand-pose .output_canvas')[0];
        const canvasCtx = canvasElement.getContext('2d');
        
        function onResults(results) {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height);
            if (results.multiHandLandmarks) {
              for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                               {color: '#00FF00', lineWidth: 1});
                drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 0});
              }
            }
            canvasCtx.restore();
          }
          
          const hands = new Hands({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }});
          hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          });
          hands.onResults(onResults);
          
          const camera = new Camera(videoElement2, {
            onFrame: async () => {
              await hands.send({image: videoElement2});
            },
            width: 500,
            height: 333
          });
          camera.start();
    });

    function stopStreamedVideo(videoElem) {
        const stream = videoElem.srcObject;
        const tracks = stream.getTracks();
      
        tracks.forEach((track) => {
          track.stop();
        });
      
        videoElem.srcObject = null;
      }

})(jQuery);
