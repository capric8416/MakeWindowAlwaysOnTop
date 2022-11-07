
// 使用ffi库
const ffi = require('ffi-napi');


// 置顶/取消窗口
class AlwaysOnTop {
    constructor() {
        // 从user32.dll库导出函数
        this.user32 = this.LoadLibrary();

        // Windows.h定义的常量
        this.GWL_EXSTYLE = -20;
        this.WS_EX_LAYERED = 0x00080000;
        this.LWA_ALPHA = 0x00000002;
        this.HWND_TOPMOST = -1;
        this.HWND_NOTOPMOST = -2;
        this.SWP_NOMOVE = 0x0001
        this.SWP_NOSIZE = 0x0002;
    }

    // 将窗口置顶
    Set(wid) {
        // 设置窗口分层属性
        this.SetWindowLong(wid, this.GWL_EXSTYLE, this.GetWindowLong(wid, this.GWL_EXSTYLE) ^ this.WS_EX_LAYERED)
        // 设置窗口透明度为99.61%，几乎看不出来透明
        this.SetLayeredWindowAttributes(wid, 0, 254, this.LWA_ALPHA)
        // 将窗口置顶
        this.SetWindowPos(wid, this.HWND_TOPMOST, 0, 0, 0, 0, this.SWP_NOSIZE | this.SWP_NOMOVE)
    }

    // 取消窗口置顶
    Unset(wid) {
        // 将窗口置于所有非顶层窗口之上，实际表现就是取消了TOPMOST属性
        this.SetWindowPos(wid, this.HWND_NOTOPMOST, 0, 0, 0, 0, this.SWP_NOSIZE | this.SWP_NOMOVE)
    }

    // 加载user32.dll，并导出下面4个函数
    LoadLibrary() {
        return new ffi.Library(
            'user32', {
               'GetWindowLongW': [
                    'long', ['int64', 'int32']
               ],
               'SetWindowLongW': [
                    'long', ['int64', 'int32', 'long']
               ],
               'SetLayeredWindowAttributes': [
                    'int32', ['int64', 'ulong', 'uint8', 'ulong']
               ],
               'SetWindowPos': [
                  'int32', ['int64', 'int64', 'int32', 'int32', 'int32', 'int32', 'uint64']
               ],
            }
        );
    }

    // Windows API
    GetWindowLong(hwnd, nIndex) {
        return this.user32.GetWindowLongW(hwnd, nIndex);
    }

    // Windows API
    SetWindowLong(hwnd, nIndex, dwNewLong) {
        return this.user32.SetWindowLongW(hwnd, nIndex, dwNewLong);
    }

    // Windows API
    SetLayeredWindowAttributes(hwnd, crKey, bAlpha, dwFlags) {
        return this.user32.SetLayeredWindowAttributes(hwnd, crKey, bAlpha, dwFlags);
    }

    // Windows API
    SetWindowPos(hwnd, hWndInsertAfter, x, y, cx, cy, uFlags) {
        return this.user32.SetWindowPos(hwnd, hWndInsertAfter, x, y, cx, cy, uFlags);
    }
}


var aot = new AlwaysOnTop()
aot.Set(0x008C09E0)
// aot.Unset(0x008C09E0)
