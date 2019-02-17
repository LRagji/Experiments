echo F| Xcopy  "package.json" "dist\package.json" 
echo F| Xcopy "package-lock.json" "dist\package-lock.json"
echo F| Xcopy "index.js" "dist\index.js"
echo F| Xcopy "ecosystem.config.js" "dist\ecosystem.config.js"
Xcopy /I /S /E "db" "dist\db"
Xcopy /I /S /E "static" "dist\static"
Xcopy /I /S /E "pages" "dist\pages"
Xcopy /I /S /E "modules" "dist\modules"

REM Delete all files except Default.jpg
cd "\dist\static\resources\images\products"
for %i in (*) do if not "%~i" == "deafult.jpg" del "%~i"

ECHO "Done Please zip the dist folder."