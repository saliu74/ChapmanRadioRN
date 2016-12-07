package com.chapmanradiorn;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;
import android.app.NotificationManager;
import android.content.Context;

import com.audioStreaming.ReactNativeAudioStreamingModule;

/**
 * Created by samy on 12/6/16.
 */

public class MyService extends Service {

    private static final String TAG = MyService.class.getSimpleName();

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i(TAG, "BLAHHHonCreate()");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i(TAG, "BLAHHHonStartCommand()");
        return START_NOT_STICKY;
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        super.onTaskRemoved(rootIntent);
        Log.i(TAG, "BLAHHH onTaskRemoved()");
        NotificationManager nMgr = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        nMgr.cancelAll();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.i(TAG, "BLAHHHonDestroy()");
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        Log.i(TAG, "BLAHHHonLowMemory()");
    }

}
