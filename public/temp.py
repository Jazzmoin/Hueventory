import json

with open("./colours.json", "r", encoding="utf-8") as f:
    v = f.read()

d = json.loads(v)

t = json.dumps(d, indent=4)
# print(t)
y = dict([(f"{x.get("colour")}{x.get("name")}{x.get("code")}", x) for x in d])
z = list(y.values())


with open("./colours2.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(z, indent=4))
