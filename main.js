audio = '';
score_leftWrist = 0;
score_rightWrist = 0;

function preload()
{
    audio = loadSound('music.mp3')
}

function setup()
{
    canvas=createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('poseNet is ready');
}

leftWristX = 0
rightWristX = 0
leftWristY = 0
rightWristY = 0

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;

        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWristX - " +leftWristX+ "  leftWristY"+leftWristY);
        console.log("rightWristX - " +rightWristX+ "  +rightWristY"+rightWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
    }
}

function draw()
{
    image(video, 0, 0, 500, 500);
    if(score_leftWrist > 0.2)
    {
        fill('red');
        stroke('red');
        circle(leftWristX, leftWristY, 20);
        num_left_y = Number(leftWristY);
        round_left_y = floor(num_left_y);
        volume = round_left_y/500;
        audio.setVolume(volume);
        document.getElementById("label2").innerHTML = "Volume: "+ volume;
    }

    if(score_rightWrist > 0.2)
    {
        fill('red');
        stroke('red');
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100)
        {
            audio.rate(0.5)
            document.getElementById("label1").innerHTML = "Speed: 0.5x";
        }

        else if(rightWristY > 100 && rightWristY <= 200)
        {
            audio.rate(1)
            document.getElementById("label1").innerHTML = "Speed: 1x";
        }

        else if(rightWristY > 200 && rightWristY <= 300)
        {
            audio.rate(1.5)
            document.getElementById("label1").innerHTML = "Speed: 1.5x";
        }

        else if(rightWristY > 300 && rightWristY <= 400)
        {
            audio.rate(2)
            document.getElementById("label1").innerHTML = "Speed: 2x";
        }

        else(rightWristY > 400 && rightWristY <= 500)
        {
            audio.rate(2.5)
            document.getElementById("label1").innerHTML = "Speed: 2.5x";
        }
    }
}

function play_music()
{
    audio.play();
    audio.setVolume(1);
    audio.rate(1);
}

function pause_music()
{
    audio.pause()
}