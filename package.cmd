7z a -tzip -y -mx=5 "%CD%\dist\Rocket Graph-win32-x64" "%CD%\dist\electron\Rocket Graph-win32-x64\*"
7z a -tzip -y -mx=5 "%CD%\dist\Rocket Graph-win32-arm64" "%CD%\dist\electron\Rocket Graph-win32-arm64\*"


set name=Rocket Graph-linux-x64
echo "%CD%\dist\%name%"
7z a -ttar -snl -y "%CD%\dist\%name%" "%CD%\dist\electron\%name%\*"
7z a -tzip -y -mx=5 "%CD%\dist\%name%" "%CD%\dist\%name%.tar"
del "%CD%\dist\%name%.tar"

set name=Rocket Graph-linux-arm64
echo "%CD%\dist\%name%"
7z a -ttar -snl -y "%CD%\dist\%name%" "%CD%\dist\electron\%name%\*"
7z a -tzip -y -mx=5 "%CD%\dist\%name%" "%CD%\dist\%name%.tar"
del "%CD%\dist\%name%.tar"

set name=Rocket Graph-darwin-x64
echo "%CD%\dist\%name%"
7z a -ttar -snl -y "%CD%\dist\%name%" "%CD%\dist\electron\%name%\*"
7z a -tzip -y -mx=5 "%CD%\dist\%name%" "%CD%\dist\%name%.tar"
del "%CD%\dist\%name%.tar"

set name=Rocket Graph-darwin-arm64
echo "%CD%\dist\%name%"
7z a -ttar -snl -y "%CD%\dist\%name%" "%CD%\dist\electron\%name%\*"
7z a -tzip -y -mx=5 "%CD%\dist\%name%" "%CD%\dist\%name%.tar"
del "%CD%\dist\%name%.tar"