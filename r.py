import requests as _r



value = _r.post("http://localhost:8000/api/v1/auth/token/obtain/", data={'username': 'admin', 'password': 'admin123'})
value = value.json()["token"]


headers = {'Authorization': 'JWT ' + value}
res = _r.get("http://localhost:8000/api/v1/scripts/", headers=headers)
print(res.text)
