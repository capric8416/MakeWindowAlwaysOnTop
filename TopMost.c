//include <Windows.h>


// 置顶/取消窗口
class AlwaysOnTop
{
public:
    static void Set(HWND wid) {
        // 设置窗口分层属性
        SetWindowLong(wid, GWL_EXSTYLE, GetWindowLong(wid, GWL_EXSTYLE) ^ WS_EX_LAYERED);
        // 设置窗口透明度为99.61%，几乎看不出来透明
        SetLayeredWindowAttributes(wid, 0, 254, LWA_ALPHA);
        // 将窗口置顶
        SetWindowPos(wid, HWND_TOPMOST, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);
    }


    // 取消窗口置顶
    static void Unset(HWND wid) {
        // 将窗口置于所有非顶层窗口之上，实际表现就是取消了TOPMOST属性
        SetWindowPos(wid, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE);
    }
};


int main(int argc, char **argv)
{
    AlwaysOnTop::Set(0x008C09E0);
    // AlwaysOnTop::Unset(0x008C09E0);
}

