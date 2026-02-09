import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(4);

Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setCrf(18);

Config.setOutputLocation('out/video.mp4');
