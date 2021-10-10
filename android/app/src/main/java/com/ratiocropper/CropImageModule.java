package com.ratiocropper;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import android.graphics.Bitmap;
import com.facebook.react.bridge.Promise;
import static android.graphics.BitmapFactory.decodeFile;

public class CropImageModule extends ReactContextBaseJavaModule {
    CropImageModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CropImageModule";
    }

    @ReactMethod
    public void crop(
        String path,
        Integer x,
        Integer y,
        Integer width,
        Integer height,
        Promise promise
    ) {
        String croppedImagePath = getReactApplicationContext().getApplicationInfo().dataDir +
            File.separator +
            "cache" +
            File.separator +
            "cropped-image-" +
            System.currentTimeMillis() +
            ".png";

        Bitmap croppedImage;

        try {
            File imageFile = new File(path);
            Bitmap image = decodeFile(imageFile.getAbsolutePath());
            croppedImage = Bitmap.createBitmap(image, x, y, width, height);
        } catch (Exception error) {
            promise.reject(error);
            return;
        }

        File file = new File(croppedImagePath);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        croppedImage.compress(Bitmap.CompressFormat.PNG, 100, bos);

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
