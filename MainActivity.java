package com.example.addition;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends Activity {
    EditText t1, t2;
    Button b1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Initialize EditText and Button elements
        t1 = (EditText) findViewById(R.id.editText1);
        t2 = (EditText) findViewById(R.id.editText2);
        b1 = (Button) findViewById(R.id.button1);
        
        // Set OnClickListener for the button
        b1.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View arg0) {
                // Get the values entered in the EditText fields
                String v1 = t1.getText().toString();
                String v2 = t2.getText().toString();
                
                // Parse the values to integers and perform addition
                try {
                    int a = Integer.parseInt(v1);
                    int b = Integer.parseInt(v2);
                    int sum = a + b;
                    
                    // Display the result using Toast
                    Toast.makeText(MainActivity.this, "Sum of Two Numbers: " + sum, Toast.LENGTH_LONG).show();
                } catch (NumberFormatException e) {
                    // Handle invalid input and show an error message
                    Toast.makeText(MainActivity.this, "Please enter valid numbers", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
}
