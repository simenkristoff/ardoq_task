
def highest_product(data: list):
    _data = sorted(data)
    _max = _data[-3:]
    _min = _data[:2]
    _min.append(_max[2])
    x_1, x_2 = 1, 1
    for i in range(3):
        x_1 *= _max[i]
        x_2 *= _min[i]

    if x_2 > x_1:
        return x_2

    return x_1


data_set = [
    [1, 10, 2, 6, 5, 3], # 300
    [-1, -5, -4, 2, 0, 5, 6, -7], # 210
    [-1, -5, -4, -2, -3, -6], # -6
    [-1, -5, -4, -2, -3, -6, 0], # 0
]

def main():
    # Run test suite
    for data in data_set:
        print(highest_product(data))

if __name__ == '__main__':
    main()

