<cfcomponent>
    <cfheader name="Access-Control-Allow-Origin" value="*">
    <cffunction name="addUser" access="remote" returntype="any">
        <cfargument  name="userName" required="true" type="string">
        <cfargument  name="age" required="true" type="string">
        <cfquery name="insertUser" datasource="practiceCrud">
            insert into users values(
                <cfqueryparam value="#arguments.userName#" cfsqltype='CF_SQL_VARCHAR'>,
                <cfqueryparam value="#arguments.age#" cfsqltype='CF_SQL_VARCHAR'>
            )
        </cfquery>
    </cffunction>
    <cffunction name="userList" access="remote" returnformat="JSON" returntype="string">
        <cfquery name="loginCheck" datasource="practiceCrud">
            select * from users
        </cfquery>
        <cfreturn serializeJSON(loginCheck)>
    </cffunction>
    <cffunction name="deleteUser" access="remote" returnformat="JSON" returntype="string">
        <cfargument  name="id" type="string" required="true">
        <cfquery name="deleteUser" datasource="practiceCrud">
            delete from users
            where id=<cfqueryparam value="#arguments.id#" cfsqltype="integer">
        </cfquery>
        <cfreturn 1>
    </cffunction>
    <cffunction name="updateUser" access="remote" returnformat="JSON" returntype="string">
        <cfargument  name="id" type="string" required="true">
        <cfargument  name="userName" type="string" required="true">
        <cfargument  name="age" type="string" required="true">
        <cfquery name="updateUser" datasource="practiceCrud">
            update users
            set username=<cfqueryparam value="#arguments.userName#" cfsqltype="string">,
            password=<cfqueryparam value="#arguments.age#" cfsqltype="string">
            where id=<cfqueryparam value="#arguments.id#" cfsqltype="integer">
        </cfquery>
        <cfreturn 1>
    </cffunction>
</cfcomponent>
