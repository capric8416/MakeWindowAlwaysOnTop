
import win32gui, win32con


# 置顶/取消窗口
class AlwaysOnTop:
    # 将窗口置顶
    @staticmethod
    def set(wid):
        # 设置窗口分层属性
        win32gui.SetWindowLong(wid, win32con.GWL_EXSTYLE, win32gui.GetWindowLong(wid, win32con.GWL_EXSTYLE) ^ win32con.WS_EX_LAYERED)
        # 设置窗口透明度为99.61%，几乎看不出来透明
        win32gui.SetLayeredWindowAttributes(wid, 0, 254, win32con.LWA_ALPHA)
        # 将窗口置顶
        win32gui.SetWindowPos(wid, win32con.HWND_TOPMOST, 0, 0, 0, 0, win32con.SWP_NOSIZE | win32con.SWP_NOMOVE)


    # 取消窗口置顶
    @staticmethod
    def unset(wid):
        # 将窗口置于所有非顶层窗口之上，实际表现就是取消了TOPMOST属性
        win32gui.SetWindowPos(wid, win32con.HWND_NOTOPMOST, 0, 0, 0, 0, win32con.SWP_NOSIZE | win32con.SWP_NOMOVE)
    


if __name__ == '__main__':
    AlwaysOnTop.set(0x008C09E0)
    # AlwaysOnTop.unset(0x008C09E0)
