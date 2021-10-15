package com.fabiosaac.ratiocropper;

import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import static android.graphics.BitmapFactory.decodeFile;

public class CropImageModule extends ReactContextBaseJavaModule {
    CropImageModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CropImageModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void crop(
            String path,
            Integer x,
            Integer y,
            Integer width,
            Integer height,
            String format,
            Promise promise
    ) {
        Log.d("format", format);

        Map<String, String> formats = new HashMap<>();
        formats.put("jpg", "jpg");
        formats.put("jepg", "jpg");
        formats.put("png", "png");
        formats.put("webp", "webp");

        Map<String, String> compressFormats = new HashMap<>();
        compressFormats.put("jpg", "JEPG");
        compressFormats.put("jepg", "JEPG");
        compressFormats.put("png", "PNG");
        compressFormats.put("webp", "WEBP");

        String croppedImagePath = getReactApplicationContext().getApplicationInfo().dataDir +
                File.separator +
                "cache" +
                File.separator +
                "cropped-image-" +
                System.currentTimeMillis() +
                "." +
                formats.getOrDefault(format, "png");

        Log.d("cropped image path", croppedImagePath);

        Bitmap croppedImage;

        try {
            File imageFile = new File(path);
            Bitmap image = decodeFile(imageFile.getAbsolutePath());

            Log.d("image size", String.valueOf(image.getHeight()) + image.getWidth());

            try {
                ExifInterface exif = new ExifInterface(imageFile.getAbsolutePath());

                int orientation = exif.getAttributeInt(ExifInterface.TAG_ORIENTATION, 1);

                if (orientation != 1) {
                    Matrix matrix = new Matrix();

                    switch (orientation) {
                        case 6:
                            matrix.postRotate(90);
                            break;
                        case 3:
                            matrix.postRotate(180);
                            break;
                        case 8: {
                            matrix.postRotate(270);
                            break;
                        }
                    }

                    image = Bitmap.createBitmap(image, 0, 0, image.getWidth(), image.getHeight(), matrix, true);
                }
            } catch (Exception ignored) {
            }

            croppedImage = Bitmap.createBitmap(image, x, y, width, height);
        } catch (Exception error) {
            promise.reject(error);
            return;
        }

        File file = new File(croppedImagePath);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        String compressFormat = compressFormats.getOrDefault(format, "PNG");

        if (compressFormat == null) {
            promise.reject("no compress formats", "No available compress formats");
            return;
        }

        try {
            switch (compressFormat) {
                case "JEPG":
                    croppedImage.compress(Bitmap.CompressFormat.JPEG, 100, bos);
                    break;
                case "WEBP":
                    croppedImage.compress(Bitmap.CompressFormat.WEBP, 100, bos);
                    break;
                default:
                    croppedImage.compress(Bitmap.CompressFormat.PNG, 100, bos);
            }
        } catch (Exception error) {
            promise.reject(error);
            return;
        }

        byte[] croppedImageByteArray = bos.toByteArray();

        try {
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(croppedImageByteArray);
            fos.flush();
            fos.close();
        } catch (Exception error) {
            promise.reject(error);
            return;
        }

        promise.resolve(croppedImagePath);
    }
}
