package com.chapmanradiorn;

import android.app.Activity;
import android.app.Application;
import android.util.Log;
import android.content.Intent;

import com.facebook.react.ReactApplication;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.audioStreaming.ReactNativeAudioStreamingPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactMaterialKitPackage(),
              new ReactNativeAudioStreamingPackage()
      );
    }
  };

  private static final String TAG = MainApplication.class.getSimpleName();

  @Override
  public void onCreate() {
    super.onCreate();
    Log.i(TAG, "BLAHHHonCreate()");
    Intent serviceIntent = new Intent(this, MyService.class);
    startService(serviceIntent);
  }

  @Override
  public void onLowMemory() {
    super.onLowMemory();
    Log.i(TAG, "BLAHHHonLowMemory()");
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
