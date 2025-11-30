document.getElementById("calcBtn").addEventListener("click", function () {
    const raw = document.getElementById("numbers").value.trim();

    if (!raw) return;

    // 支援空格與逗號分隔
    const values = raw
        .split(/[\s,]+/)
        .map(Number)
        .filter(n => !isNaN(n));

    if (values.length === 0) return;

    const decimals = parseInt(document.getElementById("decimal").value, 10) || 2;

    const mean = values.reduce((a, b) => a + b, 0) / values.length;

    // 決定樣本 / 母體
    const stdType = document.querySelector('input[name="stdType"]:checked').value;

    let variance;

    if (stdType === "sample") {
        // 樣本標準差 STDEV.S
        variance = values.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / (values.length - 1);
    } else {
        // 母體標準差 STDEV.P
        variance = values.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / values.length;
    }

    const std = Math.sqrt(variance);
    const cv = (std / mean) * 100; // 變異係數百分比

    // 附加統計資料
    const count = values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;

    // 顯示
    document.getElementById("mean").textContent = mean.toFixed(decimals);
    document.getElementById("std").textContent = std.toFixed(decimals);
    document.getElementById("cv").textContent = cv.toFixed(decimals) + "%";

    document.getElementById("count").textContent = count;
    document.getElementById("max").textContent = max;
    document.getElementById("min").textContent = min;
    document.getElementById("range").textContent = range.toFixed(decimals);

    document.getElementById("result").classList.remove("hidden");
});

// 清除按鈕
document.getElementById("clearBtn").addEventListener("click", function () {
    document.getElementById("numbers").value = "";
    document.getElementById("result").classList.add("hidden");
});
