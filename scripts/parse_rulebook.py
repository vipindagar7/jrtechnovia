import json, re, sys

lines = open(sys.argv[1], encoding="utf-8").read().splitlines()
out_path = sys.argv[2]

# split general vs events
erl_idx = [i for i, l in enumerate(lines) if re.match(r"^ERL\d+:", l)]
general = lines[: erl_idx[0]]

def blocks_from(chunk):
    blocks = []
    for raw in chunk:
        if not raw.strip():
            continue
        m_sub = re.match(r"^\s{4,}-\s+(.*)", raw)
        m_li = re.match(r"^-\s+(.*)", raw)
        if m_sub and blocks and blocks[-1]["t"] == "ul":
            last = blocks[-1]["items"][-1]
            last.setdefault("sub", []).append(m_sub.group(1).strip())
        elif m_li:
            if not blocks or blocks[-1]["t"] != "ul":
                blocks.append({"t": "ul", "items": []})
            blocks[-1]["items"].append({"text": m_li.group(1).strip()})
        else:
            blocks.append({"t": "p", "text": raw.strip()})
    return blocks

sections, cur = [], None
for l in general:
    m = re.match(r"^(1\.\d+)\s+(.*)", l)
    if m:
        cur = {"id": m.group(1), "title": m.group(2).strip(), "lines": []}
        sections.append(cur)
    elif cur:
        cur["lines"].append(l)
for s in sections:
    s["blocks"] = blocks_from(s.pop("lines"))

FIELDS = ["Time Limit", "Scoring", "Safety", "Competition Area", "Important Dimensions", "Arena Area"]
events = []
for n, start in enumerate(erl_idx):
    end = erl_idx[n + 1] if n + 1 < len(erl_idx) else len(lines)
    chunk = lines[start:end]
    code, name = chunk[0].split(":", 1)
    ev = {"code": code.strip(), "name": name.strip(), "specs": [], "rules": [], "prohibited": [], "info": {}}
    mode = None
    for l in chunk[1:]:
        s = l.strip()
        if not s:
            continue
        if re.search(r"Specifications$", s):
            mode = "specs"; continue
        if s.startswith("Rules"):
            mode = "rules"; continue
        if s.startswith("Strictly prohibited"):
            mode = "prohibited"; continue
        f = next((f for f in FIELDS if s.startswith(f)), None)
        if f:
            val = s[len(f):].lstrip(" :").strip()
            if val:
                ev["info"][f] = val
            mode = None; continue
        m_li = re.match(r"^-\s+(.*)", s)
        m_num = re.match(r"^\d+\.\s+(.*)", s)
        if mode == "specs" and m_li:
            k, _, v = m_li.group(1).partition(":")
            ev["specs"].append([k.strip(), v.strip()])
        elif mode == "rules" and m_num:
            ev["rules"].append(m_num.group(1).strip())
        elif mode == "rules" and ev["rules"]:
            ev["rules"][-1] += " " + s
        elif mode == "prohibited" and m_li:
            ev["prohibited"].append(m_li.group(1).strip())
    events.append(ev)

with open(out_path, "w", encoding="utf-8") as f:
    f.write("// Auto-generated from JT_2026.docx — do not hand-edit; regenerate instead.\n")
    f.write("export const generalRules = " + json.dumps(sections, ensure_ascii=False, indent=2) + ";\n\n")
    f.write("export const rulebook = " + json.dumps({e["code"]: e for e in events}, ensure_ascii=False, indent=2) + ";\n")

print(len(sections), "sections;", [(e["code"], len(e["specs"]), len(e["rules"]), list(e["info"])) for e in events])
