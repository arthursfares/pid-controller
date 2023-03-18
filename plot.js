function create_trace(trace_name) {
    return {
        x: new Array(100),
        y: new Array(100),
        mode: 'lines',
        type: 'scatter',
        name: trace_name,
    }
}

function create_layout(plot_title, x_title, y_title, x_range, colors) {
    return {
        title: plot_title,
        xaxis: {
            title: x_title,
            range: x_range,
            showticklabels: false,
        },
        yaxis: {
            title: y_title,
            autorange: true
        },
        colorway : colors,
    };
}

// Initialize traces
var trace = create_trace("PV");
var target_trace = create_trace("SP");
var p_trace = create_trace("P");
var i_trace = create_trace("I");
var d_trace = create_trace("D");
var pid_trace = create_trace("PID");

// Create layout objects
var x_range = [new Date().getTime() - 10000, new Date().getTime()];
var layout = create_layout("Result", "Time", "X value", x_range, ['#ff80ed', '#2c1d31']);
var pid_layout = create_layout("PID", "Time", "output", x_range, ['#1533ac', '#ffa500', '#008000', '#ff0000']);

// Add trace and layout objects to data arrays
var data = [target_trace, trace];
var pid_data = [pid_trace, p_trace, i_trace, d_trace];

// Create the plot
Plotly.newPlot(document.getElementById('result-plot'), data, layout);
Plotly.newPlot(document.getElementById('pid-plot'), pid_data, pid_layout);

// Simulate the PID controller output and update the plot
setInterval(function() {
    var time = new Date().getTime();
    var result_plot = document.getElementById('result-plot');
    var pid_plot = document.getElementById('pid-plot');

    // Add the new data point to the plot
    Plotly.extendTraces(result_plot, {
        x: [[time]],
        y: [[circleX]]
    }, [1]);
    Plotly.extendTraces(result_plot, {
        x: [[time]],
        y: [[targetX]]
    }, [0]);

    Plotly.extendTraces(pid_plot, {
        x: [[time]],
        y: [[accelerationX]]
    }, [0]);
    Plotly.extendTraces(pid_plot, {
        x: [[time]],
        y: [[proportionalX]]
    }, [1]);
    Plotly.extendTraces(pid_plot, {
        x: [[time]],
        y: [[integralX]]
    }, [2]);
    Plotly.extendTraces(pid_plot, {
        x: [[time]],
        y: [[derivativeX]]
    }, [3]);

    // Shift the x-axis range to the left as new data is added
    Plotly.relayout(result_plot, {
        'xaxis.range': [time - 10000, time] // set a new fixed range for the x-axis
    });
    Plotly.relayout(pid_plot, {
        'xaxis.range': [time - 10000, time] 
    });

}, 100); // update the plot every second
