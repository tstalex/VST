class << Marshal
     def load_with_autoload(*args)
       begin
         load(*args)
       rescue
         msg = ex.message
         if msg =~ /undefined class\/module/
           mod = msg.split(' ').last
           if Dependencies.load_missing_constant(self, mod.to_sym)
             load(*args)
           else
             raise "exc 1"
           end
         else
           raise "exc 2"
         end
       end
     end
     alias_method :load_without_autoload, :load
     alias_method :load, :load_with_autoload
   end