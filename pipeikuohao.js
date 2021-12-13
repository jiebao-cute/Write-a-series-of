//括号匹配

//给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
//借助哈希实现
var isValid = function (s) {
    const stack = [],
        map = {
            '{': '}',
            '[': ']',
            '(': ')'
        }
    for (const x of s) {
        if (x in map) {
            stack.push(x)
            continue;
        }
        if (map[stack.pop()] !== x) {
            return false
        }
    }
    return !stack.length
}

//循环实现
var isValid = function (s) {
    const stack2 = []
    for (let i = 0; i < s.length; i++) {
        let c = s[i]
        switch (c) {
            case '{':
                stack2.push('}');
                break;
            case '[':
                stack2.push(']');
                break;
            case '(':
                stack2.push(')');
                break;
            default:
                if (stack2.pop() !== c)return false
        }
    }
    return stack2.length === 0

}