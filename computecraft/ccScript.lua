---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by pierr.
--- DateTime: 11/26/2022 5:11 PM
---

--CC UUID API: pastebin get p14nFkYQ uuid
--CC JSON API: pastebin get 4nRg9CHU json

os.loadAPI("json")
os.loadAPI("uuid")


local function getDeviceType()
    if turtle then
        return "turtle"
    elseif pocket then
        return "pocket"
    elseif commands then
        return "command_computer"
    else
        return "computer"

    end
end

local ccUUID = settings.get('uuid', uuid.Generate())
settings.set('uuid', ccUUID)

ws, err = http.websocket('ws://localhost:5757')
if err then
    print(err)
else if ws then
    print("> CONNECTED")
    message = {type = 'uuid', message = ccUUID, messageID = uuid.Generate(), computerType = getDeviceType()}
    ws.send(json.encode(message))

    message = {type = 'message', message = 'connected', messageID = uuid.Generate()}
    ws.send(json.encode(message))

    while true do
        local message = ws.receive()
        message = json.decode(message)
        if message.type == 'function' then
            local func, error = loadstring(message.message)
            if func then
                print(message.message)
                res = func()
                print(json.encode(res))
                ws.send(json.encode(res))
            else
                print(error)
            end
        else
            print(message)
        end

    end
end
end

