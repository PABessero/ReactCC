function formatNumber(number)
    local rankNames = {'', 'k', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'}
    local rank = math.floor(math.log10(number) / 3 )
    local trimmed = number / (10 ^ (rank * 3))

    if number == 0 then
        return '0'
    end

    return string.format("%.3f%s", trimmed, rankNames[rank + 1])
end

ar = peripheral.wrap('left') or error('No goggles found', 0)
induction = peripheral.find('inductionPort') or error('No induction attached', 0)

peripherals = peripheral.getNames()

inductions = {}

for _, p in ipairs(peripherals) do
    type = peripheral.getType(p)
    if type == 'inductionPort' then
        table.insert(inductions, p)
    end
end

if #inductions == 0 then
    error('No induction attached', 0)
end

ar.clear()

for i, induction in ipairs(inductions) do
    _ = i - 1
    ar.fillWithId('background' .. _, 10, 10 + _ * 65, 85, 65 + _ * 65, 0xc9c9c9)
    ar.fillWithId('energyBackground' .. _, 15, 15 + _ * 65, 80, 25 + _ * 65, 0x881111)
end

while true do
    for i, induction in ipairs(inductions) do
        _ = i - 1
        induction = peripheral.wrap(induction)

        power = mekanismEnergyHelper.joulesToFE(induction.getEnergy())
        input = mekanismEnergyHelper.joulesToFE(induction.getLastInput())
        output = mekanismEnergyHelper.joulesToFE(induction.getLastOutput())
        percent = induction.getEnergyFilledPercentage()

        ar.fillWithId('filled' .. _, 15, 15 + _ * 65, 15 + 65 * percent, 25 + _ * 65, 0x57A64E)

        ar.drawStringWithId('percent' .. _, percent * 100 .. '%', 16, 16 + _ * 65, 0xffffff)
        ar.drawStringWithId('energy' .. _, formatNumber(power) .. 'RF', 15, 30 + _ * 65, 0xadadad)
        ar.drawStringWithId('input' .. _, formatNumber(input) .. 'RF/t', 15, 40 + _ * 65, 0x57A64E)
        ar.drawStringWithId('output' .. _, formatNumber(output) .. 'RF/t', 15, 50 + _ * 65, 0xCC4C4C)
    end
    sleep(0)
end
