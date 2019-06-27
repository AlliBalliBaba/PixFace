A small, currently functional implementation of pix2pix tensorflow  by affinelayer (https://github.com/affinelayer/pix2pix-tensorflow), prepared for use in the browser 

The generator produces realistic faces from doodles.
The model was trained in python and exported for use in tensorflowjs. 

Try out the generator here: https://alliballibaba.github.io/PixFace/

![alt text](https://github.com/AlliBalliBaba/PixFace/blob/master/images/display1.jpg) ![alt text](https://github.com/AlliBalliBaba/PixFace/blob/master/images/display2.jpg)

## How to export your model for use with javascript

Once you've finished training your model using affinelayer's **pixpix.py** script, you can use the **export** mode to export only the generator to a new folder:

```
python pix2pix.py --mode export --output_dir exported_model --input_dir your_model --checkpoint your_model
```

To create a .pict file and quantize your model, use the **export-checkpoint.py** script

```
python tools/export-checkpoint.py --checkpoint exported_model --output_file model.pict
```

The default setting for number of filters in the first convolutional layer of your generator (--ngf) and your discriminator (--ndf) is set to 64. When using these settings, the quantized model will be around 50 MB in size and require significant processing power.

For simple use in javascript I recommend setting -ngf to 32 or 16 before training, which will result in a final model size of around 13 MB and 3 MB. This will significantly increase the generator's speed, but also reduce the quality of the generated image.


Original pix2pix paper: https://arxiv.org/abs/1611.07004
