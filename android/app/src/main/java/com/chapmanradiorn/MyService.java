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
    public void onTaskRemoved(Intent rootIntent) {
        super.onTaskRemoved(rootIntent);
        NotificationManager nMgr = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        nMgr.cancelAll();
    }

}
