package com.chapmanradiorn;

import android.content.Intent;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ChapmanRadioRN";
    }

    private static final String TAG = MainActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.i(TAG, "onCreate()");
        Intent serviceIntent = new Intent(this, MyService.class);
        startService(serviceIntent);
    }

}
